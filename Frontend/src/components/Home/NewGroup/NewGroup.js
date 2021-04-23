import { Button, Collapse } from 'react-bootstrap';
import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import logoSmall from '../../../images/logoSmall.png';
import '../../splitwise.css'
import { getUserEmail, getUserID, getUserName } from '../../Services/ControllerUtils';
import crossSVG from '../../assets/cross.svg';
import profileImage from '../../../images/profileImage.png'
import { connect } from 'react-redux';
import { fetchUsersRedux, newGroupRedux } from '../../../reduxOps/reduxActions/newGroupRedux';

class NewGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupName: null,
            fetchUsers: [],
            open: false,
            defaultCount: 4,
            selectedList: [(getUserName().toLowerCase() + " / " +  getUserEmail().toLowerCase())],
            selected: null
        };
    }

    async componentDidMount() {
        await this.props.fetchUsersRedux();
    }

    componentDidUpdate(prevState){
        if(prevState.fetchUsers !== this.props.fetchUsers){
            this.setState({fetchUsers: this.props.fetchUsers})
        }
        if(prevState.uploadedFile !== this.props.uploadedFile){
            this.setState({uploadedFile: this.props.uploadedFile})
        }
        if(this.props.newGroup){
            this.props.history.push("/home/s/dashboard")
        }
    }


    uploadImage = (e) => {
        if (e.target.files)
            this.setState({
                file: e.target.files[0],
                fileText: e.target.files[0].name
            })
    }


    render() {
        return (
            <React.Fragment>
                <Container>
                    <Row>
                        <Col>
                            <img src={logoSmall} alt="logo" style={{ height: '65%', width: '50%', margin: '6rem',marginLeft:'12rem' }} />
                            <Row style={{marginTop:'10px',margin:'auto', width:'60%'}}>
                                        <Col sm={9}>
                                            <input style={{fontSize:'12px'}} className="form-control" type="file" name="profilepicture" accept="image/*" onChange={this.uploadImage} />
                                        </Col>
                                        <Col sm={3}>
                                        <Button onClick={async ()=>{
                                    let formData = new FormData();
                                    formData.append('myImage', this.state.file);
                                    const config={headers:{'content-type':'multipart/form-data'}};
                                    await this.props.uploadUserProfilePictureRedux("/uploadUserProfilePicture",formData,config);
                                }} disabled={!this.state.file} style={{ margin: 'auto', backgroundColor: '#FF6139', borderColor: '#FF6139',fontSize:'12px' }} >Upload</Button><br/>
                                        </Col>
                                
                                    </Row>
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
                                            {this.state.selected && this.state.selected.length>2?(<datalist onChange={(e) => console.log("onchange", e)} id="email">
                                                {this.state.fetchUsers.map((element, index) =>
                                                    <option key={element.id} value={element.id}>{element.name} / {element.email}</option>
                                                )}
                                            </datalist>):""}
                                            <Button style={{ margin: '1rem' ,backgroundColor:'#5bc5a7' ,borderColor:'#5bc5a7'}} disabled={!this.state.selected} onClick={(event) => {
                                                var tempList = this.state.selectedList;
                                                tempList.push(this.state.selected);
                                                var uniqueList = [...new Set(tempList)];
                                                this.setState({ selectedList: uniqueList,selected:"" });
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
                                            <Button style={{ backgroundColor:'#FF6139' ,borderColor:'#FF6139'}} onClick={async ()=>{
                                                let userIDArray = [];
                                                this.state.selectedList.forEach(selection=>{
                                                    this.state.fetchUsers.forEach(user =>{
                                                        if(selection.toLowerCase().includes(user.email.toLowerCase())){
                                                            if(user.rec_id)
                                                            userIDArray.push(user.rec_id);
                                                            else if(user._id)
                                                            userIDArray.push(user._id);
                                                        }
                                                    });
                                                });
                                                console.log("userIDArray",userIDArray);
                                                const data={
                                                    groupName:this.state.groupName,
                                                    email: getUserEmail(),
                                                    user_rec_id: getUserID(),
                                                    userIDArray:userIDArray,
                                                    profilePicture: this.state.uploadedFile,
                                                }
                                                await this.props.newGroupRedux(data);
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

const mapStateToProps = state =>{
    console.log("state mapstatetoprops in newGroup",state);
    return({
        fetchUsers: state.newGroup.fetchUsers,
        newGroup: state.newGroup.newGroup,
        uploadedFile: state.newGroup.uploadedFile
    });
}

export default connect(mapStateToProps, { fetchUsersRedux, newGroupRedux })(NewGroup);
