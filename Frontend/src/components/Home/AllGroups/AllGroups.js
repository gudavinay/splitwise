import { Button, Collapse, Modal, Table } from 'react-bootstrap';
import React, { Component } from 'react';
import { Col, Container, Row, Glyphicon } from 'react-bootstrap';
import Axios from 'axios';
import backendServer from '../../../webConfig';
import logoSmall from '../../../images/logoSmall.png';
import '../../splitwise.css'

class AllGroups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupName: null,
            resp: [],
            open: false,
            defaultCount: 4,
            selectedList: [(JSON.parse(localStorage.getItem("userProfile")).name + " / " + JSON.parse(localStorage.getItem("userProfile")).email)],
            selected: null
        };
    }

    acceptRejectInvite = (e) => {
        console.log(e.target.id);
        const data = {
            group_id: e.target.id,
            user_id: JSON.parse(localStorage.getItem("userProfile")).id,
            isAccepted: e.target.name == 'A' ? 1 : -1
        }
        console.log("passing in acceptRejectInvite to backend", data);
        Axios.post(`${backendServer}/acceptInvite`, data)
            .then(response => {
                console.log("response recieved from newgroup req", response);
            })
            .catch(error => {
                console.log("error recieved from newgroup req", error);
            });
    }

    render() {

        const userProfile = localStorage.getItem("userProfile");
        const userProfileJSON = JSON.parse(userProfile);
        const groupsInfo = localStorage.getItem("groupsInfo");
        const groupsInfoJSON = JSON.parse(groupsInfo);


        return (
            <div>
                {/* {localStorage.getItem("groupsInfo")}
                {localStorage.getItem("userProfile")} */}
                <center></center>
                <Table striped borderless hover size="sm">
                    <tbody>
                        {groupsInfoJSON.map(group => {
                            return <tr style={{ height: '5rem' }}>
                                <td>
                                    <h3>
                                    <a href={"/home/s/group/" + group.group_id} className="groupName">{group.name} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right" viewBox="0 0 16 16">
  <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753l5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
</svg></a></h3>
                                </td>
                                <td>
                                    {group.isAccepted == 0 && <span>
                                        <Button id={group.group_id} href="/home/s/allGroups" name="A" onClick={this.acceptRejectInvite} variant="outline-success" style={{ margin: '1rem', borderColor: '#5bc5a7' }}>Accept</Button>
                                        <Button id={group.group_id} href="/home/s/allGroups" name="R" onClick={this.acceptRejectInvite} variant="success" style={{ margin: '1rem', backgroundColor: '#5bc5a7', borderColor: '#5bc5a7' }}>reject</Button>
                                    </span>
                                    }

                                    {group.isAccepted == 1 &&
                                        <span>Invite Accepted <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#4BB543" class="bi bi-check2-circle" viewBox="0 0 16 16">
                                            <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
                                            <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
                                        </svg></span>
                                    }

                                    {group.isAccepted == -1 &&
                                        <span>Invite Rejected <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="indianred" class="bi bi-x-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                        </svg></span>
                                    }
                                </td>
                            </tr>
                        })}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default AllGroups;
