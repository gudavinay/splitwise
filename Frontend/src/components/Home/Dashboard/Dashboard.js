import { Button, Modal } from 'react-bootstrap';
import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                {localStorage.getItem("userProfile")}
                I am in dashboard
                <Container>
                    <Row>
                        <Col>
                            Dashboard
                        </Col>
                        <Col>
                            Add an expense
                        </Col>
                        <Col>
                            Settle Up
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            total balance
                        </Col>
                        <Col>
                            you owe
                        </Col>
                        <Col>
                            you are owed
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Dashboard;
