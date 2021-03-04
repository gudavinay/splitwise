import Axios from "axios";
import backendServer from '../../webConfig';
import { LOGIN, ERROR, LOGOUT } from "../types";
export const loginRedux = (data) => async dispatch => { 
    await Axios.post(`${backendServer}/login`, data)
        .then(response => {
            console.log("response recieved from login req", response);
            dispatch({
                type: LOGIN,
                payload: response.data
            })
        })
        .catch(error => {
            console.log("error recieved from login req", error);
            dispatch({
                type: ERROR,
                payload: error
            })
        });
}


export const logoutRedux = () => dispatch => dispatch({type: LOGOUT});