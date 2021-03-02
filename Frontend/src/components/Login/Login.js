import React, { Component }  from 'react';
import '../../App.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from '../LandingPage/Navbar';
import logoSmall from '../../images/logoSmall.png';
import Axios from 'axios';
import backendServer from "../../webConfig";
import { loginRedux } from '../../reduxOps/reduxActions/loginRedux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//Define a Login Component
class Login extends Component {
    constructor(props) {
    super(props);
    this.state = {
        email:null,
        password:null
    };
  }


    onSubmit = (event) => {
        event.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginRedux(data);
        
        // Axios.post(`${backendServer}/login`, data)
        // .then(response => {
        //     console.log("response recieved from login req", response);
        // })
        // .catch(error => {
        //     console.log("error recieved from login req", error);
        // });
    }

    render() {
        let redirectVar = null;
        if (cookie.load('cookie')) {
            redirectVar = <Redirect to="/home" />
        }
        console.log("******************************");
        console.log(this.props);
        console.log("******************************");
        return (
            <div>
                {redirectVar}
                <Navbar />
                <Container>
                    <Row>
                        <Col>
                            <img src={logoSmall} alt="logo" style={{ height: '70%', width: '70%', margin: '6rem' }} />
                        </Col>
                        <Col>
                            <div style={{margin:'6rem'}}>
                                <div className="panel">
                                    <h2 style={{color: '#999' , fontWeight: 'bold'}}>WELCOME TO SPLITWISE</h2>
                                </div><br />
                                <form onSubmit={this.onSubmit} method="post">
                                    <div className="form-group">
                                        <input type="email" className="form-control" onChange={(e) => this.setState({ email: e.target.value })} name="email_id" placeholder="Email Id" pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$'%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$" title="Please enter valid email address" required />
                                        {this.state.email}
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control" onChange={(e) => this.setState({ password: e.target.value })} name="password" placeholder="Password" required />
                                        {this.state.password}
                                    </div>
                                    <button type="submit" className="btn btn-primary">Sign in</button><br /><br />
                                </form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

Login.propTypes = {
    loginRedux: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}


const mapStateToProps = state =>{
    console.log("state mapstatetoprops",state);
    return({
        user: state.login.user
    });
}

//export Login Component
export default connect(mapStateToProps, {loginRedux})(Login);
// export default Login;