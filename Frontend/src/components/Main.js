import React, { Component } from "react";
import { Route } from "react-router-dom";
import Login from "./Login/Login";
import Home from "./Home/Home";
import LandingPage from "./LandingPage/LandingPage";
import SignUp from "./SignUp/SignUp";
import Dashboard from "./Home/Dashboard/Dashboard";
import { Col, Row } from "react-bootstrap";
import Sidebar from "./Home/Sidebar/Sidebar";
import RecentActivities from "./Home/RecentActivities/RecentActivities";
import UserProfile from "./Home/UserProfile/UserProfile";
import NewGroup from "./Home/NewGroup/NewGroup";
import GroupInfo from "./Home/GroupInfo/GroupInfo";
import AllGroups from "./Home/AllGroups/AllGroups";
import EditGroup from "./Home/EditGroup/EditGroup";
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: "",
    };
  }
  render() {
    return (
      <React.Fragment>
          <Route exact path="/" component={LandingPage} />
          <Route  path="/login" component={Login} />
          <Route  path="/signup" component={SignUp} />
          <Route  path="/home" component={Home} />
          <Route  path="/home/userProfile" component={UserProfile} />
          <Route  path="/home/newGroup" component={NewGroup} />
          <Route  path="/home/editGroup/:id" component={EditGroup} />
          <Row>
            <Col sm={3}>
              <Route path="/home/s" component={Sidebar}></Route>
            </Col>
            <Col sm={9}>
              <Route path="/home/s/dashboard" component={Dashboard} />
              <Route path="/home/s/recentActivities" component={RecentActivities} />
              <Route exact path="/home/s/group/:id" component={GroupInfo} />
              <Route path="/home/s/allGroups" component={AllGroups} />
            </Col>
          </Row>
      </React.Fragment>
    );
  }
}
export default Main;
