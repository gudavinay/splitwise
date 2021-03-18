import { Alert, Button } from 'react-bootstrap';
import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Axios from 'axios';
import backendServer from '../../../webConfig';
import logoSmall from '../../../images/logoSmall.png';
import '../../splitwise.css'
import profileImage from '../../../images/profileImage.png'
import { fetchGroupName } from '../../Services/ControllerUtils'

class EditGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupName: fetchGroupName(this.props.match.params.id),
            changedGroupName: fetchGroupName(this.props.match.params.id),
            selectedList: [],
        };
    }

    componentDidMount() {
        Axios.post(`${backendServer}/getGroupMembers`, { group_id: this.props.match.params.id })
            .then(response => {
                console.log(response);
                let arr = [];
                response.data.forEach(data => {
                    arr.push(data.name.toLowerCase() + " / " + data.email.toLowerCase())
                })
                this.setState({ selectedList: arr });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        // console.log(this.state);
        return (
            <React.Fragment>
                <Container>
                    <Row>
                        <Col>
                            <img src={logoSmall} alt="logo" style={{ height: '65%', width: '50%', margin: '6rem', marginLeft: '12rem' }} />
                        </Col>
                        <Col>
                            <Row>
                                <Col className='greytext'>EDIT GROUP</Col>
                            </Row>
                            {this.state.error && <Alert variant="danger" style={{width:'fit-content',margin:'8px 0px -12px 0px'}}>Error occured.</Alert>}
                            <Row>
                                <Col><br /><h4>My group shall be called…</h4></Col>
                            </Row>
                            <Row>
                                <Col>
                                    <input type="text" style={{ fontSize: '32px' }} onChange={(e) => this.setState({ groupName: e.target.value })} name="groupName" value={this.state.groupName} placeholder="Funkytown" required />
                                </Col>
                            </Row>
                            <hr />
                            <div id="example-collapse-text">
                                <Row>
                                    <Col className='greytext'>
                                        GROUP MEMBERS
                                        </Col>
                                </Row>
                                <Row>
                                </Row>
                                <Row>
                                    <div style={{ width: '55%', marginTop: '1rem' }}>
                                        {this.state.selectedList.map(user => (
                                            <Row style={{ height: '40px' }}>
                                                <Col sm={10}>
                                                    <div key={user}> <img style={{ borderRadius: '25px', height: '30px' }} src={profileImage} alt="" /> {user}</div>
                                                </Col>
                                            </Row>
                                        ))}
                                    </div>
                                </Row>
                                <hr />
                                <Row>
                                    <Col>
                                        <Button style={{ backgroundColor: '#FF6139', borderColor: '#FF6139' }} onClick={() => {
                                            const data = {
                                                name: this.state.groupName,
                                                group_id: this.props.match.params.id
                                            }
                                            Axios.post(`${backendServer}/updateGroup`, data)
                                                .then(response => {
                                                    console.log("response recieved from updateGroup req", response);
                                                    this.props.history.push("/home/s/dashboard")
                                                })
                                                .catch(error => {
                                                    console.log("error recieved from updateGroup req", error);
                                                    this.setState({error:true})
                                                });
                                        }} >Save</Button>
                                        
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}

export default EditGroup;
