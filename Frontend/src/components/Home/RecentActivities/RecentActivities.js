import React, { Component } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { getMonthFromUtils, getUserID, getDateFromUtils, getUserCurrency } from '../../Services/ControllerUtils';
import notesSVG from '../../assets/notes.svg'
import settledUp from '../../../images/settledup.png'
import { connect } from 'react-redux';
import { getAllUserExpensesForRecentActivitiesRedux } from '../../../reduxOps/reduxActions/recentActivitiesRedux'

class RecentActivities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupSelected: false
        };
    }

    async componentDidMount() {
        await this.props.getAllUserExpensesForRecentActivitiesRedux({ user_id: getUserID() });
    }

    componentDidUpdate(prevState){
        if(prevState.allUserExpensesForRA !== this.props.allUserExpensesForRA){
            this.setState({allUserExpensesForRA: this.props.allUserExpensesForRA})
        }
    }

    toggleByDate() {

    }


    render() {
        // console.log("state in RA -----",this.state);
        let tableData = "No data found.";
        const userPreferredCurrency = getUserCurrency();
        let dataToBeProcessed = this.state.groupSelected ? this.state.allUserExpensesForRA.filter(exp => exp.group_id === Number(this.state.selectedGroup)) : this.state.allUserExpensesForRA;
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
        if (this.state.allUserExpensesForRA && this.state.allUserExpensesForRA.length > 0 && this.state.allUserExpensesForRA[0] && this.state.allUserExpensesForRA[0].group_id) {
            this.state.allUserExpensesForRA.forEach(expense => {
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
                                                        return { allUserExpensesForRA: state.allUserExpensesForRA.reverse() }
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
                {/* {JSON.stringify(this.state.allUserExpensesForRA)} */}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state =>{
    console.log("state mapstatetoprops in recentactivities",state);
    return({
        allUserExpensesForRA: state.recentActivities.allUserExpensesForRA
    });
}

export default connect(mapStateToProps, {getAllUserExpensesForRecentActivitiesRedux})(RecentActivities);