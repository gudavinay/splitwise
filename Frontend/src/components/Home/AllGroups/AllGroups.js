import { Button, Table } from 'react-bootstrap';
import React, { Component } from 'react';
import '../../splitwise.css'
import { Link } from 'react-router-dom';
import { getUserID, getUserEmail, getUserName, getGroupsInfo } from '../../Services/ControllerUtils'
import groupRedirectorSVG from '../../assets/groupRedirector.svg'
import acceptedInviteSVG from '../../assets/acceptedInvite.svg'
import rejectedInviteSVG from '../../assets/rejectedInvite.svg'
import searchSVG from '../../assets/search.svg'
import { connect } from 'react-redux';
import { fetchGroupsRedux, acceptInviteRedux } from '../../../reduxOps/reduxActions/allGroupsRedux'

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

    acceptRejectInvite = async (e) => {
        console.log(e.target.id);
        const data = {
            group_id: e.target.id,
            user_id: getUserID(),
            isAccepted: e.target.name === 'A' ? 1 : -1
        }
        console.log("passing in acceptRejectInvite to backend", data);
        await this.props.acceptInviteRedux(data);
        await this.props.fetchGroupsRedux({ user_id: getUserID() });
    }

    async componentDidMount() {
        await this.props.fetchGroupsRedux({ user_id: getUserID() });
    }

    componentDidUpdate(prevState){
        if(prevState.groupsInfo !== this.props.groupsInfo){
            this.setState({groupsInfo: this.props.groupsInfo})
        }
    }

    render() {
        const groupsInfoJSON = getGroupsInfo();
        return (
            <div style={{ width: '80%', margin: 'auto' }} >
                <input  list="groupDatalist"  style={{ width: '25%', marginRight: '10px' }} id="groupsSearch" onChange={(e) => this.setState({ selected: e.target.value,selectedItem:e.target })} type="text" placeholder="Search with Group name" />
                {this.state.selected && this.state.selected.length>2 ? (<datalist onChange={(e) => console.log("onchange", e)} id="groupDatalist">
                    {this.state.groupsInfo && this.state.groupsInfo.map((element, index) =>
                        <option key={element.group_id} value={element.name}>{element.name}</option>
                    )}
                </datalist>):""}
                <Button style={{ backgroundColor:'#FF6139' ,borderColor:'#FF6139',textDecoration:'none'}} disabled={!this.state.selected} onClick={(event) => {
                    this.props.history.push('/home/s/group/'+this.state.groupsInfo.find(group=> group.name === this.state.selected).group_id);
                }}><img src={searchSVG} alt=""/></Button>
                <hr />
                {groupsInfoJSON && groupsInfoJSON.length===0 && <span style={{fontWeight:'bold', color:'#999'}}>No groups found. Please try creating a group in dashboard.</span>}
                <Table striped borderless >
                    <tbody>
                        {groupsInfoJSON && groupsInfoJSON.map(group => {
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

const mapStateToProps = state =>{
    console.log("state mapstatetoprops in allGroups",state);
    return({
        groupsInfo: state.allGroups.groupsInfo,
        acceptInvite: state.allGroups.acceptInvite
    });
}

export default connect(mapStateToProps, {fetchGroupsRedux,acceptInviteRedux})(AllGroups);
