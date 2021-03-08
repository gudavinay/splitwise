import { Button, Collapse, Modal } from 'react-bootstrap';
import React, { Component } from 'react';
import { Col, Container, Row, Glyphicon } from 'react-bootstrap';
import Axios from 'axios';
import backendServer from '../../../webConfig';
import logoSmall from '../../../images/logoSmall.png';
import '../../splitwise.css'

class NewGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupName: null,
            resp: [],
            open: false,
            defaultCount: 4,
            selectedList: [(JSON.parse(localStorage.getItem("userProfile")).name + " / " +  JSON.parse(localStorage.getItem("userProfile")).email)],
            selected: null
        };
    }

    componentDidMount() {
        // alert("component mounted");
        // if (!this.state.groups) {
        // alert("loaded groups also");
        Axios.get(`${backendServer}/fetchUsers`)
            .then(response => {
                console.log(response);
                this.setState({ resp: response.data });
            })
            .catch(error => {
                console.log(error);
                // this.setState({ resp: error });
            });
        // }
    }

    render() {
        // const items = []
        // var i=0;
        //   while(i++ != this.state.defaultCount)
        //     items.push(<li key={i}>hello world</li>)
        const userProfile = localStorage.getItem("userProfile");
        const userProfileJSON = JSON.parse(userProfile);
        console.log("state vars in newGROUP ---- ", this.state);


        return (
            <div>
                {/* {localStorage.getItem("userProfile")}
                I am in NewGroup */}
                {/* {JSON.stringify(this.state.resp)} */}

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
                                {/* {this.state.groupName} */}
                            </Row>
                            <hr/>
                            <Collapse in={this.state.open}>
                                <div id="example-collapse-text">
                                    {/* <input type="text" list="cars" /> */}
                                    {/* <datalist id="cars">
                                    <option>Volvo</option>
                                    <option>Saab</option>
                                    <option>Mercedes</option>
                                    <option>Audi</option>
                                </datalist> */}
                                    {/* {[...Array(this.state.defaultCount)].map((elementInArray, index) => ( 
                                    <div className="" key={index}> Whatever needs to be rendered repeatedly </div> 
                                        ) 
                                    )}
                                    
  {[...Array(this.state.defaultCount)].map((el, index) => <option key={index}>Item</option>)} */}
                                    <Row>
                                        <Col className='greytext'>
                                            GROUP MEMBERS
                                        </Col>
                                    </Row>
                                    <Row>
                                        {/* <Col>
                                            Name / Email Search
                                        </Col> */}
                                        {/* <Col>
                                            Name Search
                                        </Col> */}
                                    </Row>
                                    <Row>
                                        <Col>
                                            <input style={{width:'80%', marginRight:'10px'}} id="newGroupPersons" onChange={(e) => this.setState({ selected: e.target.value })} type="text" list="email" placeholder="Search with Name or Email address"/>
                                            <datalist onChange={(e) => console.log("onchange", e)} id="email">
                                                {this.state.resp.map((element, index) =>
                                                    <option key={element.id} value={element.id}>{element.name} / {element.email}</option>
                                                )}
                                            </datalist>
                                            <Button style={{ margin: '1rem' ,backgroundColor:'#5bc5a7' ,borderColor:'#5bc5a7'}} disabled={!this.state.selected} onClick={(event) => {
                                                var tempList = this.state.selectedList;
                                                tempList.push(this.state.selected);
                                                var uniqueList = [... new Set(tempList)];
                                                this.setState({ selectedList: uniqueList });
                                                document.getElementById("newGroupPersons").value = '';
                                            }}>Add</Button>
                                        </Col>
                                        {/* <Col>
                                            <input type="text" list="name" />
                                            <datalist id="name">
                                                {this.state.resp.map((element, index) =>
                                                    <option key={element.id} value={element.id}>{element.name}</option>
                                                )}
                                            </datalist>
                                        </Col> */}
                                    </Row>
                                    <Row>
                                        <ol style={{width:'80%', marginTop:'1rem'}}>
                                            {this.state.selectedList.map(user => (
                                                <Row>
                                                    <Col sm={10}>
                                                        <li key={user}>{user}</li>
                                                    </Col>
                                                    <Col sm={2}>
                                                        { !user.includes(userProfileJSON.email) && <a onClick={(e)=>{
                                                            console.log(e.target.id);
                                                            if(e.target.id){
                                                                let tempList = this.state.selectedList;
                                                                let indexToRemove = tempList.indexOf(e.target.id);
                                                                if(indexToRemove > -1){
                                                                    tempList.splice(indexToRemove,1);
                                                                }
                                                                this.setState({selectedList: tempList});
                                                            }
                                                            }}><svg value={user} id={user} xmlns="http://www.w3.org/2000/svg" width="30" height="30" color='indianred' fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                                        </svg></a>}
                                                    </Col>
                                                </Row>
                                            ))}
                                        </ol>
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
                                                    email: userProfileJSON.email,
                                                    user_rec_id: userProfileJSON.id,
                                                    userIDArray:userIDArray
                                                }
                                                Axios.post(`${backendServer}/newGroup`, data)
                                                .then(response => {
                                                    console.log("response recieved from newgroup req", response);
                                                })
                                                .catch(error => {
                                                    console.log("error recieved from newgroup req", error);
                                                });
                                            }} >Save</Button>
                                        </Col>
                                    </Row>

                                    {/* <ElementToLoad state={this.state}/> */}
                                    {/* <select name="userInvite" id="userInvite">
                                            {this.state.resp.map((element, index) =>
                                                <option key={element.id} value={element.id}>{element.email}</option>
                                            )}
                                    </select> */}
                                </div>
                            </Collapse>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default NewGroup;

// function ElementToLoad(state) {
//     console.log("state in new group", state);
//     // while()
//     var hello = <h1></h1>
//     return (<h1>hello</h1>);
// }

