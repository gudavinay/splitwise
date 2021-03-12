import React, { Component, useState } from "react";
import { Button, Col, Modal, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { useParams } from 'react-router-dom';
import "../../splitwise.css";
class GroupInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
        show:false
    };
  }

  render() {
    // let {id} = useParams();
    console.log("props in groupinfo", this.props);
    const { id } = this.props.match.params;
    // console.log("url params in groupinfo - ", id);
    return (
      <React.Fragment>
        you're in group {id}
        <Table bordered hover style={{width:'80%',margin:'auto'}}>
          <tbody>
            <tr>
              <td>
                    <Button onClick={()=>this.setState({show:true})} className="btn btn-success" style={{ backgroundColor:'#FF6139' ,borderColor:'#FF6139',textDecoration:'none'}}>Add an expense</Button>
              </td>
            </tr>
            <tr>
              <td>
                  
              </td>
            </tr>
            <tr>
              <td>1</td>
            </tr>
            <tr>
              <td>1</td>
            </tr>
          </tbody>
        </Table>
        <div>
        <Modal show={this.state.show} onHide={()=>this.setState({show:false})}>
          <Modal.Header closeButton>
            <Modal.Title>Add an expense</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <React.Fragment>
                            hellow bois
                <Row>
                    <Col><svg xmlns="http://www.w3.org/2000/svg" width="6rem" height="6rem" fill="currentColor" class="bi bi-journal-text" viewBox="0 0 16 16">
                        <path d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                        <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
                        <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
                    </svg></Col>
                    <Col>
                        <Row>Enter a description</Row>
                        <Row>$0.00</Row>
                    </Col>
                </Row>
                <Row>Paid by you and split equally</Row>
              </React.Fragment>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={()=>this.setState({show:false})}>
              Cancel
            </Button>
            <Button variant="primary" onClick={()=>this.setState({show:false})}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      </React.Fragment>
    );
  }
}

export default GroupInfo;

