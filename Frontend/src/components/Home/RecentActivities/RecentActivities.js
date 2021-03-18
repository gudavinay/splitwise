import React, { Component } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import Axios from 'axios';
import backendServer from '../../../webConfig'
import { getMonthFromUtils, getUserID, getDateFromUtils, getUserCurrency } from '../../Services/ControllerUtils';
import notesSVG from '../../assets/notes.svg'
import settledUp from '../../../images/settledup.png'

class RecentActivities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupSelected: false
        };
    }

    componentDidMount() {
        Axios.post(`${backendServer}/getAllUserExpensesForRecentActivities`, { user_id: getUserID() })
            .then(response => {
                console.log("response recieved from getAllUserExpensesForRecentActivities req", response);
                this.setState({ allUserExpenses: response.data })
            })
            .catch(error => {
                console.log("error recieved from getAllUserExpensesForRecentActivities req", error);
            });
    }

    toggleByDate() {

    }


    render() {
        // console.log("state in RA -----",this.state);
        let tableData = "No data found.";
        const userPreferredCurrency = getUserCurrency();
        let dataToBeProcessed = this.state.groupSelected ? this.state.allUserExpenses.filter(exp => exp.group_id === Number(this.state.selectedGroup)) : this.state.allUserExpenses;
        if (dataToBeProcessed && dataToBeProcessed.length > 0 && dataToBeProcessed[0] && dataToBeProcessed[0].group_id) {
            tableData = [];
            dataToBeProcessed.forEach(expense => {
                let tableRow = (
                    <tr>
                        <td>
                            <Row>
                                <Col sm={1} style={{ margin: 'auto' }}>
                                    <img style={{ height: '40px' }} src={expense.settled==='N'?notesSVG:settledUp} alt="" />
                                </Col>
                                <Col>
                                {expense.settled==='N'?(<div>
                                    <strong>{expense.paid_by === getUserID() ? "You" : expense.name}</strong> paid <strong>{userPreferredCurrency} {expense.amount}</strong> for <strong>"{expense.description}"</strong> in <strong>"{expense.group_name}"</strong>.<br />
                                    <span style={{ color: '#999', fontSize: '12px' }}>{getMonthFromUtils(expense.created_date)} {getDateFromUtils(expense.created_date)} </span>
                                </div>):(<div>
                                    <strong>{expense.paid_by === getUserID() ? "You" : expense.name}</strong> settled up <strong>{userPreferredCurrency} {expense.amount}</strong> for <strong>"{expense.description}"</strong> in <strong>"{expense.group_name}"</strong>.<br />
                                    <span style={{ color: '#999', fontSize: '12px' }}>{getMonthFromUtils(expense.updated_date)} {getDateFromUtils(expense.updated_date)} </span>
                                </div>)}
                                    </Col>

                            </Row>
                        </td>
                    </tr>
                );
                tableData.push(tableRow);
            });
        }


        let groupOptions = {};
        let groupOptionsToDisplay = [<option key="ALL_GROUP" id="ALL_GROUP">All Groups</option>];
        if (this.state.allUserExpenses && this.state.allUserExpenses.length > 0 && this.state.allUserExpenses[0] && this.state.allUserExpenses[0].group_id) {
            this.state.allUserExpenses.forEach(expense => {
                groupOptions[expense.group_id] = expense.group_name;
            });
        }
        Object.keys(groupOptions).forEach(index => {
            groupOptionsToDisplay.push(<option id={index} key={index}>{groupOptions[index]}</option>);
        })
        return (
            <React.Fragment>
                <Table bordered hover style={{ width: '98%', margin: 'auto' }}>
                    <tbody>
                        <tr style={{ background: '#eee' }}>
                            <td>
                                <Row>
                                    <Col sm={5}>
                                        <div style={{ fontSize: '25px', fontWeight: 'bold' }}>Recent Activities </div>
                                    </Col>
                                    <Col sm={3}>
                                        <div style={{ display: 'flex', margin: 'auto' }}>
                                            <label style={{ fontSize: '15px', margin: 'auto' }} for="createdDate">Filter by</label>
                                            <div>
                                                <select style={{ width: '100%', fontSize: '13px' }} onChange={(e) => {
                                                    console.log(e.target.selectedOptions[0].id);
                                                    this.setState({ selectedGroup: e.target.selectedOptions[0].id, groupSelected: e.target.selectedOptions[0].id!=="ALL_GROUP" })
                                                }} className="form-control" name="createdDate" id="createdDate">
                                                    {groupOptionsToDisplay}
                                                </select>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col sm={3}>
                                        <div style={{ display: 'flex', margin: 'auto' }}>
                                            <label style={{ fontSize: '15px', margin: 'auto' }} for="createdDate">Sort by </label>
                                            <div>
                                                <select style={{ width: '100%', fontSize: '13px' }} onChange={(e) => {
                                                    this.setState((state) => {
                                                        return { allUserExpenses: state.allUserExpenses.reverse() }
                                                    })
                                                }} className="form-control" name="createdDate" id="createdDate">
                                                    <option>Most recent on top</option>
                                                    <option>Least recent on top</option>
                                                </select>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>

                            </td>
                        </tr>
                        {tableData}
                    </tbody>
                </Table>
                {/* {JSON.stringify(this.state.allUserExpenses)} */}
            </React.Fragment>
        );
    }
}

export default RecentActivities;