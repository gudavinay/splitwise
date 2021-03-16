import { Button, Table } from 'react-bootstrap';
import React, { Component } from 'react';
import Axios from 'axios';
import backendServer from '../../../webConfig';
import '../../splitwise.css'
import { Link } from 'react-router-dom';
import { getUserProfile, getUserID, getUserEmail, getUserName, getGroupsInfo } from '../../Services/ControllerUtils'

class AllGroups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupName: null,
            resp: [],
            open: false,
            defaultCount: 4,
            selectedList: [(getUserName() + " / " + getUserEmail())],
            selected: null
        };
    }

    acceptRejectInvite = (e) => {
        console.log(e.target.id);
        const data = {
            group_id: e.target.id,
            user_id: getUserID(),
            isAccepted: e.target.name == 'A' ? 1 : -1
        }
        console.log("passing in acceptRejectInvite to backend", data);
        Axios.post(`${backendServer}/acceptInvite`, data)
            .then(response => {
                console.log("response recieved from newgroup req", response);
            })
            .catch(error => {
                console.log("error recieved from newgroup req", error);
            });
    }

    componentDidMount() {
        Axios.post(`${backendServer}/fetchGroups`, { user_id: getUserID() })
            .then(response => {
                // console.log("response recieved from newgroup req", response);
                this.setState({ groupsInfo: response.data })
                localStorage.setItem("groupsInfo", JSON.stringify(response.data))
            })
            .catch(error => {
                // console.log("error recieved from newgroup req", error);
            });
    }

    render() {
        const groupsInfoJSON = getGroupsInfo();
        return (
            <div style={{ width: '80%', margin: 'auto' }} >
                <input  list="groupDatalist"  style={{ width: '80%', marginRight: '10px' }} id="groupsSearch" onChange={(e) => this.setState({ selected: e.target.value,selectedItem:e.target })} type="text" placeholder="Search with Group name" />
                <datalist onChange={(e) => console.log("onchange", e)} id="groupDatalist">
                    {this.state.groupsInfo && this.state.groupsInfo.map((element, index) =>
                        <option key={element.group_id} value={element.name}>{element.name}</option>
                    )}
                </datalist>
                <Button style={{ backgroundColor:'#FF6139' ,borderColor:'#FF6139',textDecoration:'none'}} disabled={!this.state.selected} onClick={(event) => {
                    // var tempList = this.state.selectedList;
                    // tempList.push(this.state.selected);
                    // var uniqueList = [... new Set(tempList)];
                    // this.setState({ selectedList: uniqueList });
                    // document.getElementById("newGroupPersons").value = '';
                    // this.state.groupsInfo.filter(group=> group.name == this.state.selected)
                    // console.log(this.state,this.state.groupsInfo.find(group=> group.name == this.state.selected));
                    this.props.history.push('/home/s/group/'+this.state.groupsInfo.find(group=> group.name == this.state.selected).group_id);
                }}>Add</Button>
                <hr />
                {groupsInfoJSON && groupsInfoJSON.length==0 && <span style={{fontWeight:'bold', color:'#999'}}>No groups found. Please try creating a group in dashboard.</span>}
                <Table striped borderless >
                    <tbody>
                        {groupsInfoJSON.map(group => {
                            return <tr style={{ height: '5rem' }}>
                                <td style={{ verticalAlign: 'middle' }}>
                                    <h4>
                                        {group.isAccepted == 1 &&
                                            <Link className="groupName" to={"/home/s/group/" + group.group_id}>{group.name} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right" viewBox="0 0 16 16">
                                                <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753l5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" />
                                            </svg></Link>}

                                        {group.isAccepted != 1 &&
                                            <span style={{ color: '#999' }}>{group.name}</span>}
                                        {/* <a href={"/home/s/group/" + group.group_id} className="groupName"></a> */}
                                    </h4>
                                </td>
                                <td style={{ textAlign: 'right', verticalAlign: 'middle' }}>
                                    {group.isAccepted == 0 && <React.Fragment>
                                        <Link id={group.group_id} to="/home/s/allGroups" name="A" onClick={this.acceptRejectInvite} style={{ margin: '1rem', borderColor: '#5bc5a7', textDecoration: 'none', color: '#1CC29F' }}>Accept</Link>
                                        {/* <Button id={group.group_id} href="/home/s/allGroups" name="A" onClick={this.acceptRejectInvite} variant="outline-success" style={{ margin: '1rem', borderColor: '#5bc5a7' }}>Accept</Button> */}
                                        <Link id={group.group_id} to="/home/s/allGroups" name="R" onClick={this.acceptRejectInvite} className="btn btn-success" style={{ margin: '1rem', backgroundColor: '#5bc5a7', borderColor: '#5bc5a7' }}>Reject</Link>
                                        {/* <Button id={group.group_id} href="/home/s/allGroups" name="R" onClick={this.acceptRejectInvite} variant="success" style={{ margin: '1rem', backgroundColor: '#5bc5a7', borderColor: '#5bc5a7' }}>Reject</Button> */}
                                    </React.Fragment>
                                    }

                                    {group.isAccepted == 1 &&
                                        <React.Fragment ><span style={{ padding: '31px', verticalAlign: 'middle' }}>Invite Accepted <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#4BB543" class="bi bi-check2-circle" viewBox="0 0 16 16">
                                            <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
                                            <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
                                        </svg></span></React.Fragment>
                                    }

                                    {group.isAccepted == -1 &&
                                        <React.Fragment><span style={{ padding: '31px', verticalAlign: 'middle' }}>Invite Rejected <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="indianred" class="bi bi-x-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                        </svg></span></React.Fragment>
                                    }
                                </td>
                            </tr>
                        })}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default AllGroups;
