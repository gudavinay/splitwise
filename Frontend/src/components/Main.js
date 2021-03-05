import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './Login/Login';
import Home from './Home/Home';
import LandingPage from './LandingPage/LandingPage';
import SignUp from './SignUp/SignUp';
import Dashboard from './Home/Dashboard/Dashboard';
import { Col, Container, Row } from 'react-bootstrap';
import Sidebar from './Home/Sidebar/Sidebar';
import RecentActivities from './Home/RecentActivities/RecentActivities';
import UserProfile from './Home/UserProfile/UserProfile';
import NewGroup from './Home/NewGroup/NewGroup';
//Create a Main Component
class Main extends Component {
    render() {
        return (
            <div>
                {/*Render Different Component based on Route*/}
                <Route exact path="/" component={LandingPage} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={SignUp} />
                <Route path="/home" component={Home} />
                <Route path="/home/userProfile" component={UserProfile} />
                <Route path="/home/newGroup" component={NewGroup} />
                <Container>
                    <Row>
                        <Col sm={3} >
                            <Route path="/home/s" component={Sidebar} />
                        </Col>
                        <Col sm={9} >
                            <Route path="/home/s/dashboard" component={Dashboard} />
                            <Route path="/home/s/recentActivities" component={RecentActivities} />
                        </Col>
                    </Row>
                </Container>
                {/* <Route render={() => <Redirect to={{pathname: "/"}} />} /> */}
            </div>
        )
    }
}
//Export The Main Component
export default Main;