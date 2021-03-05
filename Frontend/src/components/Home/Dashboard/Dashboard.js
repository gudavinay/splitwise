import { Button, Modal } from 'react-bootstrap';
import React, { Component } from 'react';
import { Col, Container, Row} from 'react-bootstrap';
import Axios from 'axios';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                {/* {localStorage.getItem("userProfile")} */}
                {/* I am in dashboard */}
                <Container>
                    <Row>
                        <Col>
                           <h2><strong>Dashboard</strong></h2> 
                        </Col>
                        <Col>
                            <Button href="/home/newGroup" style={{ backgroundColor:'#FF6139' ,borderColor:'#FF6139'}}>Create a Group</Button>
                        </Col>
                        <Col>
                            <Button variant="success" href="/home/settle" style={{ backgroundColor:'#5bc5a7' ,borderColor:'#5bc5a7'}}>Settle up</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            total balance<br/>
                            <span style={{color:'#ff652f'}}>-$1496.74</span>
                        </Col>
                        <Col>
                            you owe<br/>
                            <span style={{color:'#ff652f'}}>$1496.74</span>
                        </Col>
                        <Col>
                            you are owed<br/>
                            $0.00
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Dashboard;
