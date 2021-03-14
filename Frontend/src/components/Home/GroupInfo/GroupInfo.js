import React, { Component, useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Axios from 'axios';
import backendServer from '../../../webConfig'
// import { useParams } from 'react-router-dom';
import "../../splitwise.css";
class GroupInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      description: null,
      amount: null,
      error: false,
      allExpenses: null,
      group_id: this.props.match.params.id
    };

    console.log("constructor in groups ****************");
  }


  onSubmit = async (event) => {
    event.preventDefault();
    const data = {
      description: this.state.description,
      amount: parseFloat(this.state.amount),
      group_id: this.props.match.params.id,
      paid_by: "" + JSON.parse(localStorage.getItem("userProfile")).id
    };
    console.log(data, JSON.parse(localStorage.getItem("userProfile")));
    await Axios.post(`${backendServer}/addExpense`, data)
      .then(response => {
        console.log("response recieved from addExpense req", response);
        this.setState({ show: false })
      })
      .catch(error => {
        console.log("error recieved from addExpense req", error);
        // this.setState({error:true})
      });
  }

  componentDidMount() {
    const data = {
      group_id: this.props.match.params.id
    };
    Axios.post(`${backendServer}/getAllExpenses`, data)
      .then(response => {
        console.log("response recieved from getAllExpenses req", response);
        this.setState({ allExpenses: response.data })
      })
      .catch(error => {
        console.log("error recieved from getAllExpenses req", error);
      });

    Axios.post(`${backendServer}/getAllIndividualExpenses`, data)
    .then(response => {
      console.log("response recieved from getAllIndividualExpenses req", response);
      this.setState({ allIndividualExpenses: response.data })
    })
    .catch(error => {
      console.log("error recieved from getAllIndividualExpenses req", error);
    });
  }

  

  // componentWillUpdate() {
  //   console.log("updated");

  //   const data = {
  //     group_id: this.props.match.params.id
  //   };
  //   console.log(this.props,this.state);
  //   Axios.post(`${backendServer}/getAllExpenses`, data)
  //     .then(response => {
  //       console.log("response recieved from getAllExpenses req", response);
  //       this.setState({ allExpenses: response.data })
  //     })
  //     .catch(error => {
  //       console.log("error recieved from getAllExpenses req", error);
  //     });
  // }
  render() {
    // let {id} = useParams();

    const { id } = this.props.match.params;
    const currentGroupInfo = JSON.parse(localStorage.getItem("groupsInfo")).find(group => group.group_id == id);
    var userProfileJSON = JSON.parse(localStorage.getItem("userProfile"));

    console.log("props in groupinfo", this.props, this.state);
    let tableData = "No data found. Please try adding an expense.";
    if (this.state.allExpenses && this.state.allExpenses.length > 0 && this.state.allExpenses[0] && this.state.allExpenses[0].group_id) {
      tableData=[];
      this.state.allExpenses.forEach(expense => {
        let tableRow = (
          <tr>
            <td>
              <Row>
                <Col sm={8}>{expense.description}</Col>
                <Col sm={4}><strong>{expense.paid_by==userProfileJSON.id?`You `:expense.paid_by_name}</strong> paid<br /><strong>{userProfileJSON.currency} </strong>{expense.amount}</Col>
                {/* <Col sm={2}>Paid By<br />{expense.paid_to_name}</Col> */}
              </Row>
            </td>
          </tr>
        );
        tableData.push(tableRow);
      });
    }


    let userExpense = {};
    let groupBalances = "Calculating group balances...";
    if(this.state.allIndividualExpenses && this.state.allIndividualExpenses.length > 0&& this.state.allIndividualExpenses[0] && this.state.allIndividualExpenses[0].group_id && this.state.allExpenses && this.state.allExpenses.length > 0 && this.state.allExpenses[0] && this.state.allExpenses[0].group_id){
      // this.state.allIndividualExpenses.forEach((expense,index)=>{
      //   userExpense[expense.paid_by] = 
      // });
      this.state.allExpenses.forEach(expense =>{
        userExpense[expense.paid_by] = 0;
      });
      this.state.allIndividualExpenses.forEach(expense =>{
        userExpense[expense.paid_to] = 0;
      });
      this.state.allExpenses.forEach(expense =>{
        // console.log(userExpense,userExpense[expense.paid_by],(expense.amount),userExpense[expense.paid_by]-(expense.amount));
        userExpense[expense.paid_by] = Number(userExpense[expense.paid_by])-Number(expense.amount);
      });
      this.state.allIndividualExpenses.forEach(expense =>{
        userExpense[expense.paid_to] = Number(userExpense[expense.paid_to])+Number(expense.amount);
      });

      console.log(JSON.stringify(userExpense));
      
      groupBalances = [];
        Object.keys(userExpense).forEach(index => {
          groupBalances.push(<Row>
              {index} {userExpense[index]}
            </Row>)
        })
    }


    // console.log("url params in groupinfo - ", id);
    return (
      <React.Fragment>
        {/* you're in group {id} */}
        <Row>
          <Col sm={8}>
          <Table bordered hover style={{ width: '100%', margin: 'auto' }}>
          <tbody>
            <tr style={{ background: '#eee',fontSize:'25px',fontWeight:'bold' }}>
              <td>
                <Row>
                  <Col sm={6}>
                    {currentGroupInfo.name}
                  </Col>
                  <Col style={{textAlign:'right'}}>
                    <Button onClick={() => this.setState({ show: true })} className="btn btn-success" style={{ backgroundColor: '#FF6139', borderColor: '#FF6139', textDecoration: 'none' ,margin:'0px 10px'}}>Add an expense</Button> 
                  <Button onClick={() => this.setState({ show: true })} className="btn btn-success" style={{ backgroundColor:'#5bc5a7' ,borderColor:'#5bc5a7'}}>Settle up</Button>
                  </Col>
                </Row>
                 
              </td>
            </tr>
            {tableData}
          </tbody>
        </Table>
          </Col>
          <Col>
            <span style={{color:'#999', fontWeight:'bold'}}>GROUP BALANCES</span>
            {groupBalances}
          </Col>
        </Row>
        {JSON.stringify(this.state.allExpenses)}<br/><br/>
        {JSON.stringify(this.state.allIndividualExpenses)}


        {/* {JSON.stringify(this.state.allExpenses)} */}
        <div>
          <Modal show={this.state.show} onHide={() => this.setState({ show: false })}>
            <Modal.Header closeButton style={{ background: '#5cc5a7', color: 'white' }}>
              <Modal.Title>Add an expense</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <React.Fragment>
                <center>
                  <form onSubmit={this.onSubmit}>
                    <Row>
                      <Col>
                        <svg xmlns="http://www.w3.org/2000/svg" width="6rem" height="6rem" fill="currentColor" class="bi bi-journal-text" viewBox="0 0 16 16">
                          <path d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                          <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
                          <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
                        </svg>
                      </Col>
                      <Col>
                        <Row style={{ width: '100%' }}>
                          <input type="text" className="form-control" name="description" onChange={(e) => this.setState({ description: e.target.value })} placeholder="Enter a description" title="Please enter a description" title="Enter a valid number" required />
                        </Row>
                        <Row style={{ marginTop: '1rem' }}>
                          <Col sm={2}>{JSON.parse(localStorage.getItem("userProfile")).currency}</Col>
                          <Col><input type="number" className="form-control" min="0" name="amount" onChange={(e) => this.setState({ amount: e.target.value })} placeholder="0.00" title="Please enter valid Full Name" pattern='(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$' required />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <hr />
                    <div>Paid by <strong>you</strong> and split <strong>equally</strong>.</div>
                    <hr />
                    <Row>
                      {this.state.error && <span style={{ color: 'indianred' }}>Error Occured</span>}
                    </Row>

                    <Button style={{ margin: '1rem', borderColor: '#5bc5a7', backgroundColor: 'white', color: '#5bc5a7' }} onClick={() => this.setState({ show: false })} >Cancel</Button>
                    <Button style={{ margin: '1rem', backgroundColor: '#5bc5a7', borderColor: '#5bc5a7' }} type="submit">Save</Button>

                    {/* <Button variant="secondary" onClick={() => this.setState({ show: false })}>
                      Cancel
              </Button>
                    <Button variant="primary" type="submit" onClick={() => this.setState({ show: false })}>
                      Save
              </Button> */}
                  </form>
                </center>
              </React.Fragment>
            </Modal.Body>
          </Modal>
        </div>
      </React.Fragment>
    );
  }
}

export default GroupInfo;

