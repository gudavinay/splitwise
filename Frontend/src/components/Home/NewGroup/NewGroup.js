import { Button, Collapse } from 'react-bootstrap';
import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Axios from 'axios';
import backendServer from '../../../webConfig';
import logoSmall from '../../../images/logoSmall.png';
import '../../splitwise.css'
import { getUserEmail, getUserID, getUserName } from '../../Services/ControllerUtils';
import crossSVG from '../../assets/cross.svg';
import profileImage from '../../../images/profileImage.png'

class NewGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupName: null,
            resp: [],
            open: false,
            defaultCount: 4,
            selectedList: [(getUserName().toLowerCase() + " / " +  getUserEmail().toLowerCase())],
            selected: null
        };
    }

    componentDidMount() {
        Axios.get(`${backendServer}/fetchUsers`)
            .then(response => {
                console.log(response);
                this.setState({ resp: response.data });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <React.Fragment>
                <Container>
                    <Row>
                        <Col>
                            <img src={logoSmall} alt="logo" style={{ height: '65%', width: '50%', margin: '6rem',marginLeft:'12rem' }} />
                        </Col>
                        <Col>
                            <Row>
                                <Col className='greytext'>START A NEW GROUP</Col>
                            </Row>
                            <Row>
                                <Col><br/><h4>My group shall be called…</h4></Col>
                            </Row>
                            <Row>
                                <Col>
                                    <input type="text" style={{fontSize:'32px'}} onChange={(e) => { this.setState({ groupName: e.target.value }); this.setState({ open: true }) }} name="groupName" placeholder="Funkytown" required />
                                </Col>
                            </Row>
                            <hr/>
                            <Collapse in={this.state.open}>
                                <div id="example-collapse-text">
                                    <Row>
                                        <Col className='greytext'>
                                            GROUP MEMBERS
                                        </Col>
                                    </Row>
                                    <Row>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <input style={{width:'51%', marginRight:'10px'}} id="newGroupPersons" onChange={(e) => this.setState({ selected: e.target.value })} type="text" list="email" placeholder="Search with Name or Email address"/>
                                            <datalist onChange={(e) => console.log("onchange", e)} id="email">
                                                {this.state.resp.map((element, index) =>
                                                    <option key={element.id} value={element.id}>{element.name} / {element.email}</option>
                                                )}
                                            </datalist>
                                            <Button style={{ margin: '1rem' ,backgroundColor:'#5bc5a7' ,borderColor:'#5bc5a7'}} disabled={!this.state.selected} onClick={(event) => {
                                                var tempList = this.state.selectedList;
                                                tempList.push(this.state.selected);
                                                var uniqueList = [...new Set(tempList)];
                                                this.setState({ selectedList: uniqueList });
                                                document.getElementById("newGroupPersons").value = '';
                                            }}>Add</Button>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <div style={{width:'55%', marginTop:'1rem'}}>
                                            {this.state.selectedList.map(user => (
                                                <Row style={{height:'40px'}}>
                                                    <Col sm={10}>
                                                        <div key={user}> <img style={{borderRadius:'25px', height:'30px'}} src={profileImage} alt=""/> {user}</div>
                                                    </Col>
                                                    <Col sm={2}>
                                                        { !user.includes(getUserEmail()) && <a onClick={(e)=>{
                                                            console.log(e.target.id);
                                                            if(e.target.id){
                                                                let tempList = this.state.selectedList;
                                                                let indexToRemove = tempList.indexOf(e.target.id);
                                                                if(indexToRemove > -1){
                                                                    tempList.splice(indexToRemove,1);
                                                                }
                                                                this.setState({selectedList: tempList});
                                                            }
                                                            }}><img value={user} id={user} alt="" src={crossSVG}/></a>}
                                                    </Col>
                                                </Row>
                                            ))}
                                        </div>
                                    </Row>
                                    <hr/>
                                    <Row>
                                        <Col>
                                            <Button style={{ backgroundColor:'#FF6139' ,borderColor:'#FF6139'}} onClick={()=>{
                                                let userIDArray = [];
                                                this.state.selectedList.forEach(selection=>{
                                                    this.state.resp.forEach(user =>{
                                                        if(selection.includes(user.email)){
                                                            userIDArray.push(user.rec_id);
                                                        }
                                                    });
                                                });
                                                console.log("userIDArray",userIDArray);
                                                const data={
                                                    groupName:this.state.groupName,
                                                    email: getUserEmail(),
                                                    user_rec_id: getUserID(),
                                                    userIDArray:userIDArray
                                                }
                                                Axios.post(`${backendServer}/newGroup`, data)
                                                .then(response => {
                                                    console.log("response recieved from newgroup req", response);
                                                    this.props.history.push("/home/s/dashboard")
                                                })
                                                .catch(error => {
                                                    console.log("error recieved from newgroup req", error);
                                                });
                                            }} >Save</Button>
                                        </Col>
                                    </Row>
                                </div>
                            </Collapse>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}

export default NewGroup;
