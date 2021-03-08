import React, { Component } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import '../../splitwise.css';
import backendServer from '../../../webConfig'
import Axios from 'axios';
class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: []
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
                localStorage.setItem("groupsInfo",JSON.stringify(response.data))
            })
            .catch(error => {
                console.log("error recieved from sidebar - fetch groups req", error);
                this.setState({ groups: [] })
            });
    }

    render() {
        console.log("props in sidebar", this.props);
        return (
            <div>
                <div style={{ paddingLeft: '45%' }}>
                    <div className="sidebarItem">
                        <a href="/home/s/dashboard" style={{ borderLeft: '6px solid #5bc5a7', color: '#5bc5a7', fontSize: '16px', fontWeight: 'bold', textDecoration: 'none' }}>Dashboard</a><br />
                    </div>
                    <div className="sidebarItem">
                        <a href="/home/s/recentActivities" style={{ borderLeft: '6px solid #5bc5a7', color: '#ff652f', fontSize: '16px', fontWeight: 'bold', textDecoration: 'none' }}>Recent&nbsp;Activities</a>
                    </div>
                    <br/>
                    <hr />
                </div>
                <div style={{ paddingLeft: '45%' }}>
                    <div className="sidebarHeading">
                        GROUPS
                    </div>
                    {/* <div className="sidebarItem">
                        <a onClick={() => this.props.history.push("/home/s/group/group1")} style={{ color: '#999', fontWeight: 'bold', textDecoration: 'none' }}>hello 1</a>
                    </div>
                    <div className="sidebarItem">
                        <a href="/home/s/group/group1" style={{ color: '#999', fontWeight: 'bold', textDecoration: 'none' }}>hello 2</a>
                    </div>
                    <div className="sidebarItem">
                        <a href="/home/s/group/group2" style={{ color: '#999', fontWeight: 'bold', textDecoration: 'none' }}>hello 3</a>
                    </div>
                    <div className="sidebarItem">
                        <a href="/home/s/group/group3" style={{ color: '#999', fontWeight: 'bold', textDecoration: 'none' }}>hello 4</a>
                    </div> */}
                    {this.state.groups.map(function (group, index) {
                        let refUrl = `/home/s/group/${group.group_id}`
                        return <div className="sidebarItem" ><a key={index} href={refUrl} style={{ color: '#999', fontWeight: 'bold', textDecoration: 'none' }}>{group.name}</a></div>
                    })}
                </div>
                {/* {this.state.groups && this.state.groups[0] && <GroupsLoader state={this.state}/>} */}


            </div>
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
