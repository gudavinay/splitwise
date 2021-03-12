import React, { Component } from 'react';
import { Button, Col, Container, Row, Spinner, Toast } from 'react-bootstrap';
import '../../splitwise.css';
import backendServer from '../../../webConfig'
import Axios from 'axios';
import { Link } from 'react-router-dom';
class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            pendingGroupsToAcceptFlag: false
        };
    }

    componentDidMount() {
        let userProfile = localStorage.getItem("userProfile");
        let userProfileJSON = JSON.parse(userProfile);
        const data = {
            user_id: userProfileJSON.id
        }
        Axios.post(`${backendServer}/fetchGroups`, data)
            .then(response => {
                console.log("response recieved from sidebar - fetch groups req", response);
                this.setState({ groups: response.data });
                localStorage.setItem("groupsInfo", JSON.stringify(response.data))
                response.data.forEach(group => {
                    if (!this.state.pendingGroupsToAcceptFlag && group.isAccepted == 0) {
                        this.setState({ pendingGroupsToAcceptFlag: true })
                    }
                });
            })
            .catch(error => {
                console.log("error recieved from sidebar - fetch groups req", error);
                this.setState({ groups: [] })
            });
    }

    render() {
        console.log("props in sidebar", this.props);
        return (
            <React.Fragment>
                <div style={{ paddingLeft: '45%' }}>
                    <div className="sidebarItem">
                        <Link style={{ borderLeft: '6px solid #5bc5a7', color: '#5bc5a7', fontSize: '16px', fontWeight: 'bold', textDecoration: 'none' }} to="/home/s/dashboard">Dashboard</Link>
                        {/* <a href="/home/s/dashboard" style={{ borderLeft: '6px solid #5bc5a7', color: '#5bc5a7', fontSize: '16px', fontWeight: 'bold', textDecoration: 'none' }}>Dashboard</a><br /> */}
                    </div>
                    <div className="sidebarItem">
                        <Link style={{ borderLeft: '6px solid #5bc5a7', color: '#ff652f', fontSize: '16px', fontWeight: 'bold', textDecoration: 'none' }} to="/home/s/recentActivities">Recent&nbsp;Activities</Link>
                        {/* <a href="/home/s/recentActivities" style={{ borderLeft: '6px solid #5bc5a7', color: '#ff652f', fontSize: '16px', fontWeight: 'bold', textDecoration: 'none' }}>RecentActivities</a> */}
                    </div>
                    <div className="sidebarItem">
                        <Link style={{ borderLeft: '6px solid #5bc5a7', color: '#999', fontSize: '16px', fontWeight: 'bold', textDecoration: 'none' }} to="/home/s/allGroups" onClick={()=>this.setState({pendingGroupsToAcceptFlag:false})}>All&nbsp;Groups{this.state.pendingGroupsToAcceptFlag && <Spinner animation="grow" size="sm" variant="danger" />}</Link>
                        {/* <a href="/home/s/allGroups" style={{ borderLeft: '6px solid #5bc5a7', color: '#999', fontSize: '16px', fontWeight: 'bold', textDecoration: 'none' }}>See allGroups</a> */}
                    </div>
                    <br />
                    <hr />
                </div>
                <div style={{ paddingLeft: '45%' }}>
                    <div className="sidebarHeading">
                        GROUPS
                    </div>
                    {this.state.groups.map(function (group, index) {
                        // let refUrl = `/home/s/group/${group.group_id}`;
                        if (group.isAccepted == 1) {
                            return <div className="sidebarItem" >
                                <Link style={{ color: '#999', fontWeight: 'bold', textDecoration: 'none' }} to={"/home/s/group/"+group.group_id}>{group.name}</Link>
                                {/* <a key={index} href={refUrl} style={{ color: '#999', fontWeight: 'bold', textDecoration: 'none' }}>{group.name}</a> */}
                                </div>
                        } else {
                            return <React.Fragment></React.Fragment>
                        }
                    })}
                </div>
                {/* {this.state.groups && this.state.groups[0] && <GroupsLoader state={this.state}/>} */}


            </React.Fragment>
        );
    }
}

export default Sidebar;

// function GroupsLoader(state) {
//     console.log("state in sidebar - function for groups loading", state);
//     if(state.state.groups && state.state.groups[0]){
//         state.state.groups.forEach(group=>{
//                 return <div href={group.group_id}>{group.name} {group.admin_email}</div>
//             })
//     }else{
//         return <div>No Groups</div>
//     }
// }
