import Axios from "axios";
import backendServer from '../../webConfig';
import { GROUP_MEMBERS, UPDATE_GROUP, ERROR  } from "../types";

export const getGroupMembersRedux = (data) => async dispatch => { 
    await Axios.post(`${backendServer}/getGroupMembers`, data)
        .then(response => {
            console.log("response recieved from getGroupMembers req", response);
            dispatch({
                type: GROUP_MEMBERS,
                payload: response.data
            })
        })
        .catch(error => {
            console.log("error recieved from getGroupMembers req", error);
            dispatch({
                type: ERROR,
                payload: error
            })
        });
}

export const updateGroupRedux = (data) => async dispatch => { 
    await Axios.post(`${backendServer}/updateGroup`, data)
        .then(response => {
            console.log("response recieved from updateGroup req", response);
            dispatch({
                type: UPDATE_GROUP,
                payload: response.data
            })
        })
        .catch(error => {
            console.log("error recieved from updateGroup req", error);
            dispatch({
                type: ERROR,
                payload: error
            })
        });
}