import React, { Component } from 'react';
import '../../App.css';
import { Redirect } from 'react-router';
import { Container, Row, Col, Collapse } from 'react-bootstrap';
import Navbar from '../LandingPage/Navbar';
import logoSmall from '../../images/logoSmall.png';
import { signupRedux } from '../../reduxOps/reduxActions/signupRedux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

//Define a Login Component
class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            email: null,
            password: null,
            open:false
        };
    }


    onSubmit = async (event) => {
        event.preventDefault();
        const data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
        await this.props.signupRedux(data);
        // Axios.post(`${backendServer}/signup`, data)
        //     .then(response => {
        //         console.log(response);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
        this.setState({
            signupClicked: true
        })

    }

    render() {
        let redirectVar = null,message = null;
        if (localStorage.getItem("userProfile")) {
            redirectVar = <Redirect to="/home/s/dashboard" />
        }
        if (this.state.signupClicked) {
            console.log("PROPS in SINGUP after click ", this.state, this.props);
            if (this.props.user && this.props.user.id) {
                localStorage.setItem("userProfile", JSON.stringify(this.props.user));
                redirectVar = <Redirect to="/home/s/dashboard" />
            } else if(this.props.user === 'ER_DUP_ENTRY'){
                message = `This email already belongs to another account.`;
            }else{
                message = `Some error occured`;
            }
        }
        return (
            <div>
                {redirectVar}
                <Navbar />
                <Container>
                    <Row style={{color: 'indianred',marginLeft:'21rem',display:message?'inline-block':'none'}}><Alert variant='danger'>{message}</Alert></Row>
                    <Row>
                        <Col>
                            <img src={logoSmall} alt="logo" style={{ height: '70%', width: '70%', margin: '6rem' }} />
                        </Col>
                        <Col>
                            <div style={{ margin: '6rem' }}>
                                <div class="panel">
                                    <h2 style={{ color: '#999', fontWeight: 'bold' }}>INTRODUCE YOURSELF</h2>
                                </div><br />
                                <form onSubmit={this.onSubmit} method="post">
                                    <div class="form-group">
                                        <span style={{fontSize:'24px'}}>Hi there! My name is</span>
                                        <input type="text" class="form-control" onChange={(e) => {this.setState({ name: e.target.value });this.setState({open:true})}} name="name" placeholder="Full Name" title="Please enter valid Full Name" required />
                                        {/* {this.state.name} */}
                                    </div>
                                    <Collapse in={this.state.open}>
                                        <div id="example-collapse-text">
                                            <div class="form-group">
                                                Here’s my <strong>email address:</strong>
                                                <input type="email" class="form-control" onChange={(e) => this.setState({ email: e.target.value })} name="email_id" placeholder="" pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$'%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$" title="Please enter valid email address" required />
                                                {/* {this.state.email} */}
                                            </div>
                                            <div class="form-group">
                                                And here’s my <strong>password:</strong>
                                                <input type="password" class="form-control" onChange={(e) => this.setState({ password: e.target.value })} name="password" placeholder="" required />
                                                {/* {this.state.password} */}
                                            </div>
                                        </div>
                                    </Collapse>

                                    <button type="submit" class="btn btn-primary">Sign me up!</button><br /><br />
                                </form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

SignUp.propTypes = {
    signupRedux: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}


const mapStateToProps = state =>{
    console.log("state mapstatetoprops in signup",state);
    return({
        user: state.signup.user
    });
}

//export Login Component
// export default SignUp;
export default connect(mapStateToProps, {signupRedux})(SignUp);