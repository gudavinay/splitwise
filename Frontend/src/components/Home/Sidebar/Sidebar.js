import React, { Component } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import '../../splitwise.css';
class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <Container>
                    <div style={{paddingLeft:'45%'}}>
                        <div className="sidebarItem">
                            <a href="/home/s/dashboard" style={{ borderLeft: '6px solid #5bc5a7', color: '#5bc5a7', fontSize: '16px', fontWeight: 'bold', textDecoration: 'none' }}>Dashboard</a><br />
                        </div>
                        <div className="sidebarItem">
                            <a href="/home/s/recentActivities" style={{ borderLeft: '6px solid #5bc5a7', color: '#ff652f', fontSize: '16px', fontWeight: 'bold', textDecoration: 'none' }}>Recent&nbsp;Activities</a>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}

export default Sidebar