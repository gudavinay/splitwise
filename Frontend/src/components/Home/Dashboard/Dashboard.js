import { Button, Modal } from 'react-bootstrap';
import React, { Component } from 'react';
import { Col, Container, Row} from 'react-bootstrap';
import '../../splitwise.css'
import { Link } from 'react-router-dom';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <React.Fragment>
                    <Row>
                        <Col>
                           <h2><strong>Dashboard</strong></h2> 
                        </Col>
                        <Col>
                            <Link className="btn btn-success" to="/home/newGroup" style={{ backgroundColor:'#FF6139' ,borderColor:'#FF6139',textDecoration:'none'}}>Create a Group</Link>
                        </Col>
                        <Col>
                            <Link className="btn btn-success" to="/home/settle" style={{ backgroundColor:'#5bc5a7' ,borderColor:'#5bc5a7'}}>Settle up</Link>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col>
                            total balance<br/>
                            <span style={{color:'#ff652f'}}>$0.00</span>
                        </Col>
                        <Col style={{borderLeft:'1px solid #ddd',borderRight:'1px solid #ddd'}}>
                            you owe<br/>
                            <span style={{color:'#ff652f'}}>$0.00</span>
                        </Col>
                        <Col>
                            you are owed<br/>
                            $0.00
                        </Col>
                    </Row>
            </React.Fragment>
        );
    }
}

export default Dashboard;
