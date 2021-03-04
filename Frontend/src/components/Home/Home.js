import React, { Component } from 'react';
import { Redirect } from 'react-router';
import '../../App.css';
import Navbar from '../LandingPage/Navbar';

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
            <div>
                {redirectVar}
                <Navbar />
                <br/>
            </div>
        )
    }
}

export default Home;
