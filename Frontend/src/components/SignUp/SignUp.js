import React, { Component }  from 'react';
import '../../App.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from '../LandingPage/Navbar';
import logoSmall from '../../images/logoSmall.png';
import Axios from 'axios';
import backendServer from "../../webConfig";

//Define a Login Component
class SignUp extends Component {
    constructor(props) {
    super(props);
    this.state = {
        name:null,
        email:null,
        password:null
    };
  }


    onSubmit = (event) => {
        event.preventDefault();
        const data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
        Axios.post(`${backendServer}/signup`, data)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });

    }

    render() {
        let redirectVar = null;
        if (cookie.load('cookie')) {
            redirectVar = <Redirect to="/" />
        }
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
                                <div class="panel">
                                    <h2 style={{color: '#999' , fontWeight: 'bold'}}>INTRODUCE YOURSELF</h2>
                                </div><br />
                                <form onSubmit={this.onSubmit} method="post">
                                    <div class="form-group">
                                        <input type="text" class="form-control" onChange={(e) => this.setState({ name: e.target.value })} name="name" placeholder="Full Name" title="Please enter valid Full Name" required />
                                        {this.state.name}
                                    </div>
                                    <div class="form-group">
                                        <input type="email" class="form-control" onChange={(e) => this.setState({ email: e.target.value })} name="email_id" placeholder="Email Id" pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$'%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$" title="Please enter valid email address" required />
                                        {this.state.email}
                                    </div>
                                    <div class="form-group">
                                        <input type="password" class="form-control" onChange={(e) => this.setState({ password: e.target.value })} name="password" placeholder="Password" required />
                                        {this.state.password}
                                    </div>
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
//export Login Component
export default SignUp;