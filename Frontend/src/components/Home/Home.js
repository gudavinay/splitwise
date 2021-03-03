import React, { Component } from 'react';
import '../../App.css';
import cookie from 'react-cookies';
import { Redirect, Route } from 'react-router';
import Navbar from '../LandingPage/Navbar';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Dashboard from './Dashboard/Dashboard.js';
import RecentActivities from './RecentActivities/RecentActivities.js';

class Home extends Component {

    constructor(props) {
        super(props);
        // console.log("setting props", this.state);
        this.state = {
            toLoad: null
        };
        // console.log("setting props", this.state);
    }

    render() {
        //if not logged in go to login page
        // let redirectVar = null;
        // if(!cookie.load('cookie')){
        //     redirectVar = <Redirect to= "/login"/>
        // }

//         border: 1px solid;
//   padding: 10px;
//   box-shadow: 5px 10px 8px #888888;
  
        return (
            <div>
                {/* {redirectVar} */}
                <Navbar />
                <br/>


            </div>
        )
    }
}
//export Home Component
export default Home;

// function ElementToLoad(state) {
//     console.log("state in home", state);
//     // if (state.data.toLoad == 'DASHBOARD') {
//     //     return <Dashboard />;
//     // }
//     if (state.data.toLoad == 'RA') {
//         return <RecentActivities />;
//     }
//     // return <div>Something's broke</div>
//     return <Dashboard />;//bydefault dashboard loads
// }
