import React, { Component } from "react";
import { Button, Col, Collapse, Modal, OverlayTrigger, Row, Table, Tooltip } from "react-bootstrap";
import { currencyConverter, getUserID, getUserProfile, getUserCurrency, getGroupsInfo, getMonthFromUtils, getDateFromUtils } from '../../Services/ControllerUtils'
import "../../splitwise.css";
import notesSVG from '../../assets/notes.svg';
import { Link } from "react-router-dom";
import settingsSVG from '../../assets/settings.svg'
import { connect } from 'react-redux';
import { getAllExpensesRedux, getAllIndividualExpensesRedux, addExpenseRedux, exitGroupRedux } from '../../../reduxOps/reduxActions/groupsInfoRedux';

class GroupInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      description: null,
      amount: null,
      error: false,
      allExpenses: null,
      group_id: this.props.match.params.id,
      open: false
    };
  }

  onSubmit = async (event) => {
    event.preventDefault();
    const data = {
      description: this.state.description,
      amount: parseFloat(this.state.amount),
      group_id: this.props.match.params.id,
      paid_by: "" + getUserID()
    };
    await this.props.addExpenseRedux(data);
  }
  async componentDidMount() {
    await this.props.getAllExpensesRedux({ group_id: this.props.match.params.id });
    await this.props.getAllIndividualExpensesRedux({ group_id: this.props.match.params.id });
  }


  componentDidUpdate(prevState) {
    if (prevState.allExpenses !== this.props.allExpenses) {
      this.setState({ allExpenses: this.props.allExpenses })
    }
    if (prevState.allIndividualExpenses !== this.props.allIndividualExpenses) {
      this.setState({ allIndividualExpenses: this.props.allIndividualExpenses })
    }
    if (this.props.exitGroup) {
      this.props.history.push("/");
    }
    if (this.props.addExpense) {
      window.location.reload();
    }
  }

  render() {
    const userPreferredCurrency = getUserCurrency();
    let disableExitGroup = false;
    const { id } = this.props.match.params;
    const currentGroupInfo = getGroupsInfo().find(group => group.group_id == id);
    var userProfileJSON = getUserProfile();
    console.log("props in groupinfo", this.props, this.state);
    let tableData = "No data found. Please try adding an expense.";
    if (this.state.allExpenses && this.state.allExpenses.length > 0 && this.state.allExpenses[0] && this.state.allExpenses[0].group_id) {
      tableData = [];
      this.state.allExpenses.forEach(expense => {
        let tableRow = (
          <tr>
            <td>
              <Row>
                <Col sm={1} style={{ paddingLeft: '2rem', color: '#999' }}>
                  <Row style={{ fontSize: '12px' }}>{getMonthFromUtils(expense.created_date)}</Row>
                  <Row style={{ fontSize: '20px' }}>{getDateFromUtils(expense.created_date)}</Row>
                </Col>
                <Col sm={7} style={{ margin: 'auto' }}>{expense.description}</Col>
                <Col sm={4} style={{ color: '#999' }}><strong>{expense.paid_by === getUserID() ? `You ` : expense.paid_by_name}</strong> paid<br /><span style={{ color: 'black' }}><strong>{currencyConverter(userProfileJSON.currency)} {expense.amount}</strong></span></Col>
              </Row>
            </td>
          </tr>
        );
        tableData.push(tableRow);
      });
    }


    let userExpense = {};
    let userExpenseNames = {};
    let groupBalances = "No data found.";
    userExpense[getUserID()] = 0;
    if (this.state.allIndividualExpenses && this.state.allIndividualExpenses.length > 0 && this.state.allIndividualExpenses[0] && this.state.allIndividualExpenses[0].group_id && this.state.allExpenses && this.state.allExpenses.length > 0 && this.state.allExpenses[0] && this.state.allExpenses[0].group_id) {
      this.state.allExpenses.forEach(expense => {
        userExpense[expense.paid_by] = 0;
        userExpenseNames[expense.paid_by] = expense.name;
      });
      this.state.allIndividualExpenses.forEach(expense => {
        userExpense[expense.paid_to] = 0;
        userExpenseNames[expense.paid_to] = expense.name;
      });
      this.state.allExpenses.forEach(expense => {
        userExpense[expense.paid_by] = (Number(userExpense[expense.paid_by]) - Number(expense.amount)).toFixed(2);
      });
      this.state.allIndividualExpenses.forEach(expense => {
        userExpense[expense.paid_to] = (Number(userExpense[expense.paid_to]) + Number(expense.amount)).toFixed(2);
      });

      console.log(JSON.stringify(userExpense));

      groupBalances = [];
      Object.keys(userExpense).forEach(index => {
        let rowData = null;
        if (userExpense[index] < 0) {
          disableExitGroup = true;
          rowData = (<Col><Row>{userExpenseNames[index]}</Row><Row><span style={{ fontSize: '12px', padding: '0', color: '#5bc5a7' }}> gets back <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{userPreferredCurrency} {userExpense[index] * -1}</span></span></Row></Col>);
        } else if (userExpense[index] > 0) {
          disableExitGroup = true;
          rowData = (<Col><Row>{userExpenseNames[index]}</Row><Row><span style={{ fontSize: '12px', padding: '0', color: '#ff652f' }}> owes <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{userPreferredCurrency} {userExpense[index]}</span></span></Row></Col>);
        } else {
          rowData = (<Col><Row>{userExpenseNames[index]}</Row><Row><span style={{ fontSize: '12px', padding: '0', color: '#999' }}>settled up</span></Row></Col>);
        }
        groupBalances.push(rowData);
      })
    }

    let disableLeaveGroup = Number(userExpense[getUserID()]) !== 0;

    return (
      <React.Fragment>
        <Row>
          <Col sm={8}>
            <Table bordered hover style={{ width: '100%', margin: 'auto' }}>
              <tbody>
                <tr style={{ background: '#eee', fontSize: '25px', fontWeight: 'bold' }}>
                  <td>
                    <Row>
                      <Col sm={6}>
                        {currentGroupInfo.name}
                      </Col>
                      <Col style={{ textAlign: 'right' }}>
                        <Button onClick={() => this.setState({ show: true })} className="btn btn-success" style={{ backgroundColor: '#FF6139', borderColor: '#FF6139', textDecoration: 'none', margin: '0px 10px' }}>Add an expense</Button>
                      </Col>
                    </Row>
                  </td>
                </tr>
                {tableData}
              </tbody>
            </Table>
          </Col>
          <Col>
            <div style={{ backgroundColor: '#eee', borderRadius: '4px', padding: '10px', width: 'fit-content' }}>
              <a onClick={() => this.setState((state) => {
                return { open: !state.open }
              })}>Group settings  <img style={{ padding: '0px 4px' }} src={settingsSVG} alt="" /></a>
              <Collapse in={this.state.open}>
                <div>
                  <div>
                    <Link to={"/home/editGroup/" + id} className="btn" style={{ fontSize: '12px', color: 'indianred', borderColor: 'indianred', padding: '0px 10px', margin: '12px 32px 5px 32px' }}>Edit Group</Link>
                  </div>
                  <div>
                    <OverlayTrigger placement="left" overlay={
                      <Tooltip id={`tooltip-left`}>
                        <span>You can leave the group only when <strong>all your expenses</strong> are <strong>settled up</strong></span>
                      </Tooltip>}>
                      <span>
                        <Button onClick={async (e) => {
                          await this.props.exitGroupRedux({ group_id: id, user_id: getUserID() });
                        }} variant="danger" disabled={disableLeaveGroup} style={{ fontSize: '12px', borderColor: 'indianred', padding: '0px 10px', margin: '4px 27px 10px 28px', display: 'block' }}>Leave Group</Button></span>
                    </OverlayTrigger>
                  </div>
                  <div>
                    <OverlayTrigger placement="left" overlay={
                      <Tooltip id={`tooltip-left`}>
                        <span>You can delete the group only when <strong>all the expenses</strong> are <strong>settled up</strong></span>
                      </Tooltip>}>
                      <span>
                        <Button variant="danger" disabled={disableExitGroup} style={{ fontSize: '12px', borderColor: 'indianred', padding: '0px 10px', margin: '5px 27px', display: 'block' }}>Delete Group</Button></span>
                    </OverlayTrigger>
                  </div>
                </div>
              </Collapse>
            </div>
            <div>
            </div>
            <div style={{ color: '#999', fontWeight: 'bold' }}>GROUP BALANCES</div>
            {groupBalances}
          </Col>
        </Row>
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
                        <img alt="" src={notesSVG} />
                      </Col>
                      <Col>
                        <Row style={{ width: '100%' }}>
                          <input type="text" className="form-control" name="description" onChange={(e) => this.setState({ description: e.target.value })} placeholder="Enter a description" title="Please enter a description" required />
                        </Row>
                        <Row style={{ marginTop: '1rem' }}>
                          <Col sm={2} style={{ margin: 'auto' }}>{userPreferredCurrency}</Col>
                          <Col><input type="number" className="form-control" step=".01" min="0.01" max="99999999.99" name="amount" onChange={(e) => { this.setState({ amount: Number(e.target.value).toFixed(2) }); console.log(this.state.amount); }} pattern='(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$' placeholder="0.00" required />
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
                  </form>
                </center>
              </React.Fragment>
            </Modal.Body>
          </Modal>
        </div>
        {/* {JSON.stringify(this.state.allIndividualExpenses)}
        {JSON.stringify(this.state.allExpenses)}
        {JSON.stringify(userExpense)} */}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  console.log("state mapstatetoprops in dashboard", state);
  return ({
    allExpenses: state.groupsInfo.allExpenses,
    allIndividualExpenses: state.groupsInfo.allIndividualExpenses,
    addExpense: state.groupsInfo.addExpense,
    exitGroup: state.groupsInfo.exitGroup
  });
}

export default connect(mapStateToProps, { getAllExpensesRedux, getAllIndividualExpensesRedux, addExpenseRedux, exitGroupRedux })(GroupInfo);

