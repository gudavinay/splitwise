import React, { Component } from 'react';
import '../../splitwise.css';
import { Link } from 'react-router-dom';
import { getUserID } from '../../Services/ControllerUtils';
import groupTagSVG from '../../assets/groupTag.svg'
import allGroupsSVG from '../../assets/allGroups.svg'
import dashboardSVG from '../../assets/dashboard.svg'
import recentActivitiesSVG from '../../assets/recentActivities.svg'
import { connect } from 'react-redux';
import { fetchGroupsRedux } from '../../../reduxOps/reduxActions/allGroupsRedux'
class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            pendingGroupsToAcceptFlag: false
        };
    }

    async componentDidMount() {
        await this.props.fetchGroupsRedux({user_id: getUserID()});
    }

    componentDidUpdate(prevState){
        if(prevState.groups !== this.props.groups){
            localStorage.setItem("groupsInfo", JSON.stringify(this.props.groups))
            this.setState({groups: this.props.groups})
        }
    }

    render() {
        // console.log("SIDEBARRRRRRR-------",this.props,this.state,this.props.location.pathname);
        var dashboardActive,recentActivitiesActive,allGroupsActive = false;
        if(this.props && this.props.location && this.props.location.pathname){
            dashboardActive=this.props.location.pathname.includes("dashboard");
            recentActivitiesActive=this.props.location.pathname.includes("recentActivities");
            allGroupsActive=this.props.location.pathname.includes("allGroups");
        }
        // console.log("in sidebar checking for ghoups",this.state);
        var errorMsg = <span style={{color:'#999'}}>You do not have any groups yet.</span>;
            this.state.groups.forEach(group=>{
                console.log("in loop",group);
                if(group.isAccepted === 1){
                    errorMsg="";
                }
            })

        return (
            <React.Fragment>
                <div style={{ paddingLeft: '45%' }}>
                    <div className="sidebarItem">
                        <Link style={{ borderLeft: dashboardActive?'6px solid #5bc5a7':'#999', color: dashboardActive?'#5bc5a7':'#999', fontSize: '16px', fontWeight: 'bold', textDecoration: 'none',paddingLeft:'4px' }} to="/home/s/dashboard"><img alt=""  src={dashboardSVG}/> Dashboard</Link>
                    </div>
                    <div className="sidebarItem">
                        <Link style={{ borderLeft: recentActivitiesActive?'6px solid #ff652f':'#999', color: recentActivitiesActive?'#ff652f':'#999', fontSize: '16px', fontWeight: 'bold', textDecoration: 'none',paddingLeft:'4px' }} to="/home/s/recentActivities"><img alt="" src={recentActivitiesSVG}/> Recent&nbsp;Activities</Link>
                    </div>
                    <div className="sidebarItem">
                        <Link style={{ borderLeft: allGroupsActive?'6px solid #5bc5a7':'#999', color: allGroupsActive?'#5bc5a7':'#999', fontSize: '16px', fontWeight: 'bold', textDecoration: 'none',paddingLeft:'4px' }} to="/home/s/allGroups" onClick={()=>this.setState({pendingGroupsToAcceptFlag:false})}><img alt="" src={allGroupsSVG}/> All&nbsp;Groups{this.state.pendingGroupsToAcceptFlag && <span style={{color:'indianred'}}>*</span>}</Link>
                    </div>
                    <br />
                    <hr />
                </div>
                <div style={{ paddingLeft: '45%', fontSize:'11px' }}>
                    <div className="sidebarHeading">
                        GROUPS
                    </div>
                    {errorMsg}
                    {this.state.groups.map(function (group, index) {
                        if (group.isAccepted === 1) {
                            return <div className="sidebarItem" >
                                <Link key={index} to={"/home/s/group/"+group.group_id} style={{ color: '#999', fontWeight: 'bold', textDecoration: 'none' ,fontSize:'14px'}}><img alt="" src={groupTagSVG}/> {group.name}</Link>
                                </div>
                        } else {
                            return <React.Fragment></React.Fragment>
                        }
                    })}
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state =>{
    console.log("state mapstatetoprops in sidebar",state);
    return({
        groups: state.allGroups.groupsInfo
    });
}

export default connect(mapStateToProps, {fetchGroupsRedux})(Sidebar);