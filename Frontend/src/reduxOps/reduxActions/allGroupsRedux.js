import Axios from "axios";
import backendServer from '../../webConfig';
import { ACCEPT_INVITE,FETCH_GROUPS,ERROR  } from "../types";
import { getToken } from '../../components/Services/ControllerUtils';

export const fetchGroupsRedux = (data) => async dispatch => { 
    Axios.defaults.headers.common['authorization'] = getToken();
    await Axios.post(`${backendServer}/fetchGroups`, data)
        .then(response => {
            console.log("response recieved from fetchGroups req", response);
            dispatch({
                type: FETCH_GROUPS,
                payload: response.data
            })
        })
        .catch(error => {
            console.log("error recieved from fetchGroups req", error);
            dispatch({
                type: ERROR,
                payload: error
            })
        });
}

export const acceptInviteRedux = (data) => async dispatch => { 
    Axios.defaults.headers.common['authorization'] = getToken();
    await Axios.post(`${backendServer}/acceptInvite`, data)
        .then(response => {
            console.log("response recieved from acceptInvite req", response);
            dispatch({
                type: ACCEPT_INVITE,
                payload: response.data
            })
        })
        .catch(error => {
            console.log("error recieved from acceptInvite req", error);
            dispatch({
                type: ERROR,
                payload: error
            })
        });
}
