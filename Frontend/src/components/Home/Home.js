import React, { Component } from 'react';
import { Row,Col } from 'react-bootstrap';
import { Redirect } from 'react-router';
import '../../App.css';
import Navbar from '../LandingPage/Navbar';
import Dashboard from './Dashboard/Dashboard';
import RecentActivities from './RecentActivities/RecentActivities';
import Sidebar from './Sidebar/Sidebar';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toLoad: null
        };
    }

    render() {
        let redirectVar = null;
        if(!localStorage.getItem('userProfile')){
            redirectVar = <Redirect to= "/"/>
        }
  
        return (
            <React.Fragment>
                {redirectVar}
                <Navbar />
                <br/>
            </React.Fragment>
        )
    }
}

export default Home;
