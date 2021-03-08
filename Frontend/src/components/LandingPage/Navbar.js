import React, { Component } from 'react';
import { Button, Col, Container, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import logoSplitwise from '../../images/logo.png';
import { logoutRedux } from '../../reduxOps/reduxActions/loginRedux';
import { connect } from 'react-redux';

// import store from './../../store';

class Navbar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        // const state = store.getState();
        const userProfile = localStorage.getItem("userProfile");
        const userProfileJSON = JSON.parse(userProfile);
        // var user = JSON.parse(localStorage.getItem("userProfile"));
        var loggedIn = (userProfileJSON && userProfileJSON.id) ? true : false;
        console.log("props from navbar", this.props, localStorage.getItem("userProfile"));
        // console.log("prosp from navbar",this.props,state);
        console.log("LOGGED IN__________", loggedIn);
        return !loggedIn ? (
            <div>
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
                            <Button variant="outline-success" href="/login" style={{ margin: '1rem',borderColor:'#5bc5a7'}}>Log In</Button>
                        </Col>
                        <Col>
                            <Button variant="success" href="/signup" style={{ margin: '1rem' ,backgroundColor:'#5bc5a7' ,borderColor:'#5bc5a7'}}>Sign Up</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        ) : (<div style={{ backgroundColor: '#5bc5a7', boxShadow: '0px 4px 10px #888888' }}>
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
                    <Col style={{ height: '48px', marginTop: '22px' }}>
                        <a href="/home/userProfile" style={{ margin: '1rem', color: 'whitesmoke', fontSize:'25px',fontWeight:'bold' }}>{userProfileJSON.name}</a>
                            <OverlayTrigger
                                placement='bottom'
                                overlay={
                                    <Tooltip id={`tooltip-bottom`}>
                                        <strong>Logout</strong>
                                    </Tooltip>
                                }>
                                <a style={{ color: 'whitesmoke' }} href="/" onClick={(e) => {
                                    window.localStorage.clear();
                                    this.props.logoutRedux();
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                                        <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                                    </svg>
                                </a>
                            </OverlayTrigger>
                    </Col>
                </Row>
            </Container>
        </div>);
    }
}

// export default Navbar;
export default connect(null,{logoutRedux})(Navbar);