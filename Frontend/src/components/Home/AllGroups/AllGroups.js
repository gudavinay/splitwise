import { Button, Table } from 'react-bootstrap';
import React, { Component } from 'react';
import Axios from 'axios';
import backendServer from '../../../webConfig';
import '../../splitwise.css'
import { Link } from 'react-router-dom';
import { getUserID, getUserEmail, getUserName, getGroupsInfo } from '../../Services/ControllerUtils'
import groupRedirectorSVG from '../../assets/groupRedirector.svg'
import acceptedInviteSVG from '../../assets/acceptedInvite.svg'
import rejectedInviteSVG from '../../assets/rejectedInvite.svg'
import searchSVG from '../../assets/search.svg'

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
            isAccepted: e.target.name === 'A' ? 1 : -1
        }
        console.log("passing in acceptRejectInvite to backend", data);
        Axios.post(`${backendServer}/acceptInvite`, data)
            .then(response => {
                console.log("response recieved from newgroup req", response);
                window.location.reload();
            })
            .catch(error => {
                console.log("error recieved from newgroup req", error);
            });
    }

    componentDidMount() {
        Axios.post(`${backendServer}/fetchGroups`, { user_id: getUserID() })
            .then(response => {
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
                <input  list="groupDatalist"  style={{ width: '25%', marginRight: '10px' }} id="groupsSearch" onChange={(e) => this.setState({ selected: e.target.value,selectedItem:e.target })} type="text" placeholder="Search with Group name" />
                <datalist onChange={(e) => console.log("onchange", e)} id="groupDatalist">
                    {this.state.groupsInfo && this.state.groupsInfo.map((element, index) =>
                        <option key={element.group_id} value={element.name}>{element.name}</option>
                    )}
                </datalist>
                <Button style={{ backgroundColor:'#FF6139' ,borderColor:'#FF6139',textDecoration:'none'}} disabled={!this.state.selected} onClick={(event) => {
                    this.props.history.push('/home/s/group/'+this.state.groupsInfo.find(group=> group.name === this.state.selected).group_id);
                }}><img src={searchSVG} alt=""/></Button>
                <hr />
                {groupsInfoJSON && groupsInfoJSON.length===0 && <span style={{fontWeight:'bold', color:'#999'}}>No groups found. Please try creating a group in dashboard.</span>}
                <Table striped borderless >
                    <tbody>
                        {groupsInfoJSON.map(group => {
                            return <tr style={{ height: '5rem' }}>
                                <td style={{ verticalAlign: 'middle' }}>
                                    <h4>
                                        {group.isAccepted === 1 &&
                                            <Link className="groupName" to={"/home/s/group/" + group.group_id}>{group.name} <img alt="" src={groupRedirectorSVG}/></Link>}
                                        {group.isAccepted !== 1 &&
                                            <span style={{ color: '#999' }}>{group.name}</span>}
                                    </h4>
                                </td>
                                <td style={{ textAlign: 'right', verticalAlign: 'middle' }}>
                                    {group.isAccepted === 0 && <React.Fragment>
                                        <Link id={group.group_id} to="/home/s/allGroups" name="A" onClick={this.acceptRejectInvite} style={{ margin: '1rem', borderColor: '#5bc5a7', textDecoration: 'none', color: '#1CC29F' }}>Accept</Link>
                                        <Link id={group.group_id} to="/home/s/allGroups" name="R" onClick={this.acceptRejectInvite} className="btn btn-success" style={{ margin: '1rem', backgroundColor: '#5bc5a7', borderColor: '#5bc5a7' }}>Reject</Link>
                                    </React.Fragment>
                                    }
                                    {group.isAccepted === 1 &&
                                        <React.Fragment ><span style={{ padding: '31px', verticalAlign: 'middle' }}>Invite Accepted <img alt="" src={acceptedInviteSVG}/></span></React.Fragment>
                                    }
                                    {group.isAccepted === -1 &&
                                        <React.Fragment><span style={{ padding: '31px', verticalAlign: 'middle' }}>Invite Rejected <img alt="" src={rejectedInviteSVG}/></span></React.Fragment>
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
