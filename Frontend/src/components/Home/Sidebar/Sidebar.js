import React, { Component } from 'react';
import '../../splitwise.css';
import backendServer from '../../../webConfig'
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { getUserID } from '../../Services/ControllerUtils';
class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            pendingGroupsToAcceptFlag: false
        };
    }

    componentDidMount() {
        const data = {
            user_id: getUserID()
        }
        Axios.post(`${backendServer}/fetchGroups`, data)
            .then(response => {
                console.log("response recieved from sidebar - fetch groups req", response);
                this.setState({ groups: response.data });
                localStorage.setItem("groupsInfo", JSON.stringify(response.data))
                response.data.forEach(group => {
                    if (!this.state.pendingGroupsToAcceptFlag && group.isAccepted === 0) {
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
        // console.log("props in sidebar", this.props);
        return (
            <React.Fragment>
                <div style={{ paddingLeft: '45%' }}>
                    <div className="sidebarItem">
                        <Link style={{ borderLeft: '6px solid #5bc5a7', color: '#5bc5a7', fontSize: '16px', fontWeight: 'bold', textDecoration: 'none' }} to="/home/s/dashboard">Dashboard</Link>
                        {/* <a href="/home/s/dashboard" style={{ borderLeft: '6px solid #5bc5a7', color: '#5bc5a7', fontSize: '16px', fontWeight: 'bold', textDecoration: 'none' }}>Dashboard</a><br /> */}
                    </div>
                    <div className="sidebarItem">
                        <Link style={{ borderLeft: '6px solid #5bc5a7', color: '#ff652f', fontSize: '16px', fontWeight: 'bold', textDecoration: 'none' }} to="/home/s/recentActivities"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-flag-fill" viewBox="0 0 16 16">
  <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001"/>
</svg> Recent&nbsp;Activities</Link>
                        {/* <a href="/home/s/recentActivities" style={{ borderLeft: '6px solid #5bc5a7', color: '#ff652f', fontSize: '16px', fontWeight: 'bold', textDecoration: 'none' }}>RecentActivities</a> */}
                    </div>
                    <div className="sidebarItem">
                        <Link style={{ borderLeft: '6px solid #5bc5a7', color: '#999', fontSize: '16px', fontWeight: 'bold', textDecoration: 'none' }} to="/home/s/allGroups" onClick={()=>this.setState({pendingGroupsToAcceptFlag:false})}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
  <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
  <path fill-rule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
  <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
</svg> All&nbsp;Groups{this.state.pendingGroupsToAcceptFlag && <span style={{color:'indianred'}}>*</span>}</Link>
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
                        if (group.isAccepted === 1) {
                            return <div className="sidebarItem" >
                                {/* <Link style={{ color: '#999', fontWeight: 'bold', textDecoration: 'none' }} to={"/home/s/group/"+group.group_id}>{group.name}</Link><br/> */}
                                <a key={index} href={"/home/s/group/"+group.group_id} style={{ color: '#999', fontWeight: 'bold', textDecoration: 'none' }}>{group.name}</a>
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
