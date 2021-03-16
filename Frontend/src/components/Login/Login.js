import React, { Component }  from 'react';
import '../../App.css';
import { Redirect } from 'react-router';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import Navbar from '../LandingPage/Navbar';
import logoSmall from '../../images/logoSmall.png';
import { loginRedux } from '../../reduxOps/reduxActions/loginRedux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUserProfile } from '../Services/ControllerUtils';

//Define a Login Component
class Login extends Component {
    constructor(props) {
    super(props);
    this.state = {
        email:null,
        password:null
    };
  }


    onSubmit =async  (event) => {
        event.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password
        };
        await this.props.loginRedux(data);
        this.setState({
            loginClicked: true
        })
    }

    render() {
        let redirectVar,message = null;
        if (getUserProfile()) {
            redirectVar = <Redirect to="/home/s/dashboard" />
        }
        if (this.state.loginClicked) {
            if (this.props.user && this.props.user.id) {
                localStorage.setItem("userProfile", JSON.stringify(this.props.user));
                redirectVar = <Redirect to="/home/s/dashboard" />
            } else {
                message = "Whoops! We couldn't find an account for that email address and password. Maybe try again.";
            }
        }

        return (
            <React.Fragment>
                {redirectVar}
                <Navbar />
                <Container>
                    <div style={{color: 'indianred',margin:'auto',display:message?'block':'none',width:'55%'}}><Alert variant='danger'>{message}</Alert></div>
                    <Row>
                        <Col>
                            <img src={logoSmall} alt="logo" style={{ height: '65%', width: '50%', margin: '6rem',marginLeft:'16rem' }} />
                        </Col>
                        <Col>
                            <div style={{margin:'6rem', paddingTop:'4rem', paddingRight:'8rem',marginLeft:'2rem'}}>
                                <div className="panel">
                                    <h2 style={{color: '#999' , fontWeight: 'bold'}}>WELCOME TO SPLITWISE</h2>
                                </div><br />
                                <form onSubmit={this.onSubmit} method="post">
                                    <div className="form-group">
                                        <input type="email" className="form-control" onChange={(e) => this.setState({ email: e.target.value })} name="email_id" placeholder="Email Id" pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$'%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$" title="Please enter valid email address" required />
                                        {/* {this.state.email} */}
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control" onChange={(e) => this.setState({ password: e.target.value })} name="password" placeholder="Password" required />
                                        {/* {this.state.password} */}
                                    </div>
                                    <button type="submit" className="btn btn-primary">Sign in</button><br /><br />
                                </form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        )
    }
}

Login.propTypes = {
    loginRedux: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}


const mapStateToProps = state =>{
    console.log("state mapstatetoprops in login",state);
    return({
        user: state.login.user
    });
}

//export Login Component
export default connect(mapStateToProps, {loginRedux})(Login);
// export default Login;