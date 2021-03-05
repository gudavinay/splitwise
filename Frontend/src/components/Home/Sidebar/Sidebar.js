import React, {Component} from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';

class Sidebar extends Component{
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col sm={3}>
                            <Button variant="light" href="/home/s/dashboard">Dashboard</Button><br />
                            <Button variant="light" href="/home/s/recentActivities">Recent Activities</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Sidebar