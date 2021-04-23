import React, { Component } from "react";
import {
  Col,
  Container,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import { logoutRedux } from "../../reduxOps/reduxActions/loginRedux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getUserID, getUserName, getUserProfile } from "../Services/ControllerUtils";
import logoSVG from '../assets/logo.svg'
import logoutSVG from '../assets/logout.svg'
import profileImage from '../../images/profileImage.png'

// import store from './../../store';

class Navbar extends Component {
  render() {
    var loggedIn = getUserProfile() && getUserID()? true : false;
    console.log(
      "props from navbar",
      this.props,
      getUserProfile()
    );
    // console.log("prosp from navbar",this.props,state);
    console.log("LOGGED IN__________", loggedIn);
    return !loggedIn ? (
      <PreLoginSnippet />
    ) : (
      <div style={{
          backgroundColor: "#5bc5a7",
          boxShadow: "0px 4px 10px #888888",
        }}>
        <PostLoginSnippet />
      </div>
    );
  }
}

function PreLoginSnippet() {
  return (
    <React.Fragment>
      <Container>
        <Row style={{margin:'0% 3%'}}>
          <Col>
          <Link to="/"><img alt="" style={{height:'100%',width:'25%'}} src={logoSVG}/>
          </Link>
          </Col>
          <Col style={{textAlign:'right'}}>
            <Link style={{ margin: '1rem',borderColor:'#5bc5a7', textDecoration:'none', color:'#1CC29F'}} to="/login">Log In</Link>
            <Link className="btn btn-success" style={{ margin: '1rem' ,backgroundColor:'#5bc5a7' ,borderColor:'#5bc5a7'}} to="/signup">Sign Up</Link>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

function PostLoginSnippet() {
  return (
    <React.Fragment>
      <Container>
        <Row style={{ margin: "0% 3%" }}>
          <Col>
          <Link to="/"><img
                id="logo" width="140" height="48" style={{height:'100%'}}
                src="https://assets.splitwise.com/assets/core/logo-wordmark-horizontal-white-short-c309b91b96261a8a993563bdadcf22a89f00ebb260f4f04fd814c2249a6e05d4.svg"
                alt="Splitwise Logo"
              /></Link>
          </Col>
          <Col style={{textAlign:'right',display:'flex', justifyContent:'flex-end'}}>
            <div><Link
              to="/home/userProfile"
              style={{
                margin: "1rem",
                color: "whitesmoke",
                fontSize: "20px",
                fontWeight: "bold",
                textDecoration:'none',
                display:'flex'
              }}
            >
              <div><img style={{borderRadius:'25px', height:'30px', margin:'0px 8px'}} src={profileImage} alt=""/></div><div style={{marginTop:'2px'}}>{getUserName()}</div>
            </Link></div>
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip id={`tooltip-bottom`}>
                  <strong>Logout</strong>
                </Tooltip>
              }
            >
              <a
                style={{ color: "whitesmoke", display:'flex' }}
                href="/"
                onClick={(e) => {
                  window.localStorage.clear();
                  this.props.logoutRedux();
                }}
              >
                <img alt="" src={logoutSVG}/>
              </a>
            </OverlayTrigger>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

// export default Navbar;
export default connect(null, { logoutRedux })(Navbar);
