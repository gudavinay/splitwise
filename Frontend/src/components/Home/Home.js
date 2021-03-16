import React, { Component } from 'react';
import { Redirect } from 'react-router';
import '../../App.css';
import Navbar from '../LandingPage/Navbar';
import { getUserProfile } from '../Services/ControllerUtils';
class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toLoad: null
        };
    }

    render() {
        let redirectVar = null;
        if(!getUserProfile()){
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
