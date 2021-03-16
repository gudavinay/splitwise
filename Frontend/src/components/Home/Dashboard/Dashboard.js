import { Button, Modal } from 'react-bootstrap';
import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import '../../splitwise.css'
import { Link } from 'react-router-dom';
import Axios from 'axios';
import backendServer from '../../../webConfig';
import { getUserCurrency, getUserID } from '../../Services/ControllerUtils';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
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

        Axios.post(`${backendServer}/getAllUserExpenses`, { user_id: getUserID() })
            .then(response => {
                console.log("response recieved from getallUserExpenses req", response);
                this.setState({ allUserExpenses: response.data })
            })
            .catch(error => {
                console.log("error recieved from getallUserExpenses req", error);
            });

        // Axios.post(`${backendServer}/getAllIndividualExpenses`, data)
        //     .then(response => {
        //         console.log("response recieved from getAllIndividualExpenses req", response);
        //         this.setState({ allIndividualExpenses: response.data })
        //     })
        //     .catch(error => {
        //         console.log("error recieved from getAllIndividualExpenses req", error);
        //     });
    }

    onSubmit = async (event) => {
        event.preventDefault();
        // const data = {
        //   description: this.state.description,
        //   amount: parseFloat(this.state.amount),
        //   group_id: this.props.match.params.id,
        //   paid_by: "" + getUserID()
        // };
        // await Axios.post(`${backendServer}/addExpense`, data)
        //   .then(response => {
        //     console.log("response recieved from addExpense req", response);
        //     this.setState({ show: false })
        //   })
        //   .catch(error => {
        //     console.log("error recieved from addExpense req", error);
        //     // this.setState({error:true})
        //   });
    }


    render() {

        let arr = [];
        if (this.state.allUserExpenses && this.state.allUserExpenses.length > 0) {
            this.state.allUserExpenses.forEach(exp => {
                arr.push(<div>{JSON.stringify(exp)}</div>)
            })
        }
        let userExpense = {};
        let userExpenseTotal = {};
        let userExpenseNames = {};
        if (this.state.allUserExpenses && this.state.allUserExpenses.length > 0) {
            this.state.allUserExpenses.forEach(expense => {
                userExpense[expense.paid_to] = 0;
                userExpenseTotal[expense.paid_to] = 0;
                userExpenseNames[expense.paid_to] = expense.name;
            })
            this.state.allUserExpenses.forEach(expense => {
                if(expense.paid_to === getUserID())
                userExpense[expense.paid_by] = (Number(userExpense[expense.paid_by]) - Number(expense.amount)).toFixed(2);
                userExpenseTotal[expense.paid_by] = (Number(userExpenseTotal[expense.paid_by]) - Number(expense.amount)).toFixed(2);
            });
            this.state.allUserExpenses.forEach(expense => {
                if(expense.paid_by === getUserID())
                userExpense[expense.paid_to] = (Number(userExpense[expense.paid_to]) + Number(expense.amount)).toFixed(2);
                userExpenseTotal[expense.paid_to] = (Number(userExpenseTotal[expense.paid_to]) + Number(expense.amount)).toFixed(2);
            });
        }




        var youOweColumn = [];
        var youAreOwedColumn = [];

        // var youOwe = userExpense[getUserID()] ? <span>{getUserCurrency()} {userExpense[getUserID()] * -1}</span> : "Calculating...";
        // var youAreOwed = userExpense[getUserID()] ? <span>{getUserCurrency()} {userExpense[getUserID()] * -1}</span> : "Calculating...";

        var youOwe = 0;
        var youAreOwed = 0;

        let groupBalances = [];
        Object.keys(userExpense).forEach(index => {
            let rowData = null;
            if (Number(index) !== getUserID()) {
                if (userExpense[index] > 0) {
                    youAreOwed += Number(userExpense[index]);
                    rowData = (<tr><td><Col><Row>{userExpenseNames[index]}</Row><Row><span style={{ fontSize: '12px', padding: '0', color: '#5bc5a7' }}> owes you<span style={{ fontSize: '14px', fontWeight: 'bold' }}>{getUserCurrency()} {userExpense[index]}</span></span></Row></Col></td></tr>);
                    youAreOwedColumn.push(rowData);
                }
                if (userExpense[index] < 0) {
                    youOwe += Number(userExpense[index]);
                    rowData = (<tr><td><Col><Row>{userExpenseNames[index]}</Row><Row><span style={{ fontSize: '12px', padding: '0', color: '#ff652f' }}> you owe <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{getUserCurrency()} {userExpense[index] * -1}</span></span></Row></Col></td></tr>);
                    youOweColumn.push(rowData);
                }
            }
        })

        var totalBalance = userExpenseTotal[getUserID()] ? <span>{getUserCurrency()} {userExpenseTotal[getUserID()] * -1}</span> : "Calculating...";
        youOwe = <span>{getUserCurrency()} {youOwe}</span>
        youAreOwed = <span>{getUserCurrency()} {youAreOwed}</span>
        if(youOweColumn.length===0){
            youOweColumn = <span style={{color:'#999'}}>You do not owe anything</span>
        }

        if(youAreOwedColumn.length===0){
            youAreOwedColumn = <span style={{color:'#999'}}>You are not owed anything</span>
        }

        return (
            <React.Fragment>
                <div style={{ background: '#eee', padding: '1rem' }}>
                    <Row>
                        <Col>
                            <h2><strong>Dashboard</strong></h2>
                        </Col>
                        <Col>
                            <Link className="btn btn-success" to="/home/newGroup" style={{ backgroundColor: '#FF6139', borderColor: '#FF6139', textDecoration: 'none' }}>Create a Group</Link>
                        </Col>
                        <Col>
                            {/* <Link className="btn btn-success" to="/home/settle" style={{ backgroundColor:'#5bc5a7' ,borderColor:'#5bc5a7'}}>Settle up</Link> */}
                            <Button onClick={() => this.setState({ show: true })} className="btn btn-success" style={{ backgroundColor: '#5bc5a7', borderColor: '#5bc5a7' }}>Settle up</Button>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col>
                            total balance<br />
                            <span style={{ color: '#ff652f' }}>{totalBalance}</span>
                        </Col>
                        <Col style={{ borderLeft: '1px solid #ddd', borderRight: '1px solid #ddd' }}>
                            you owe<br />
                            <span style={{ color: '#ff652f' }}>{youOwe}</span>
                        </Col>
                        <Col>
                            you are owed<br />
                            {youAreOwed}
                        </Col>
                    </Row>
                </div>
                <hr />
                <Row>
                    <Col>
                        <span style={{color:'#999', fontWeight:'bold'}}>YOU OWE</span>
                    </Col>
                    <Col>
                        <span style={{color:'#999', fontWeight:'bold'}}>YOU ARE OWED</span>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ borderRight: '1px solid #ddd' }}>
                        <table>
                            {youOweColumn}
                        </table>
                    </Col>
                    <Col>
                        {youAreOwedColumn}
                    </Col>
                </Row>
                <hr />
                <div>
                    <Modal show={this.state.show} onHide={() => this.setState({ show: false })}>
                        <Modal.Header closeButton style={{ background: '#5cc5a7', color: 'white' }}>
                            <Modal.Title>Settle up</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <React.Fragment>
                                <center>
                                    <form onSubmit={this.onSubmit}>
                                        <Row><span><strong>You</strong> paid HELLO</span></Row>
                                        <Row><span>{getUserCurrency()} 121212</span></Row>
                                        <Button style={{ margin: '1rem', borderColor: '#5bc5a7', backgroundColor: 'white', color: '#5bc5a7' }} onClick={() => this.setState({ show: false })} >Cancel</Button>
                                        <Button style={{ margin: '1rem', backgroundColor: '#5bc5a7', borderColor: '#5bc5a7' }} type="submit">Save</Button>
                                    </form>
                                </center>
                            </React.Fragment>
                        </Modal.Body>
                    </Modal>
                </div>
                {arr}<hr />
                {JSON.stringify(userExpense)}<hr />
                {JSON.stringify(userExpenseNames)}<hr />
                {groupBalances}


            </React.Fragment>
        );
    }
}

export default Dashboard;
