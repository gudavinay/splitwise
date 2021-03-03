import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Button, Col, Container, Row } from 'react-bootstrap';
import logoSplitwise from '../../images/logo.png';
// import store from './../../store';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
    }
    render() {
        //if Cookie is set render Logout Button
        // const state = store.getState();
        const userProfile = localStorage.getItem("userProfile");
        const userProfileJSON = JSON.parse(userProfile);
        // var user = JSON.parse(localStorage.getItem("userProfile"));
        var loggedIn = (userProfileJSON && userProfileJSON.id)?true:false;
        console.log("props from navbar", this.props, localStorage.getItem("userProfile"));
        // console.log("prosp from navbar",this.props,state);
        let navLogin = null;
        if (cookie.load('cookie')) {
            console.log("Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                    <li><Link to="/" onClick={this.handleLogout}><span class="glyphicon glyphicon-user"></span>Logout</Link></li>
                </ul>
            );
        } else {
            //Else display login button
            console.log("Not Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                    <li><Link to="/login"><span class="glyphicon glyphicon-log-in"></span> Login</Link></li>
                </ul>
            )
        }
        let redirectVar = null;
        if (cookie.load('cookie')) {
            redirectVar = <Redirect to="/home" />
        }
        console.log("LOGGED IN__________",loggedIn);
        return !loggedIn ? (
            <div>
                {redirectVar}
                <Container>
                    <Row>
                        <Col >
                            <a href="/" className="flex items-center">
                                <img src={logoSplitwise} alt="Splitwise Logo" style={{ height: '100%', width: '100%' }} />
                            </a>
                        </Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                        <Col>
                            <Button variant="outline-success" href="/login" style={{ margin: '1rem' }}>Log In</Button>
                        </Col>
                        <Col>
                            <Button variant="success" href="/signup" style={{ margin: '1rem' }}>Sign Up</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        ) : (<div style={{ backgroundColor: '#5bc5a7',boxShadow:'0px 4px 10px #888888' }}>
            {redirectVar}
            <Container>
                <Row>
                    <Col >
                        <a href="/home/s/dashboard" className="flex items-center">
                        <img id="logo" src="https://assets.splitwise.com/assets/core/logo-wordmark-horizontal-white-short-c309b91b96261a8a993563bdadcf22a89f00ebb260f4f04fd814c2249a6e05d4.svg" alt="Splitwise Logo" style={{ height: '100%', width: '100%' }} />
                            {/* <img src={logoSplitwise} alt="Splitwise Logo" style={{ height: '100%', width: '100%' }} /> */}
                        </a>
                    </Col>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col style={{height:'48px',marginTop:'22px'}}>
                            <a  href="/userProfile" style={{ margin: '1rem',color:'whitesmoke',fontWeight:'bolder' }}>{userProfileJSON.name}</a>
                    </Col>
                </Row>
            </Container>
        </div>);
    }
}

export default Navbar;