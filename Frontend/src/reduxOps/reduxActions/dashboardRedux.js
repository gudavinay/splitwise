import Axios from "axios";
import backendServer from '../../webConfig';
import { SETTLE_UP, ERROR, GET_ALL_USER_EXPENSES } from "../types";
import { getToken } from '../../components/Services/ControllerUtils';

export const getAllUserExpensesRedux = (data) => async dispatch => { 
    Axios.defaults.headers.common['authorization'] = getToken();
    await Axios.post(`${backendServer}/getAllUserExpenses`, data)
        .then(response => {
            console.log("response recieved from getAllUserExpenses req", response);
            dispatch({
                type: GET_ALL_USER_EXPENSES,
                payload: response.data
            })
        })
        .catch(error => {
            console.log("error recieved from getAllUserExpenses req", error);
            dispatch({
                type: ERROR,
                payload: error
            })
        });
}

export const settleUpRedux = (data) => async dispatch => { 
    Axios.defaults.headers.common['authorization'] = getToken();
    await Axios.post(`${backendServer}/settleUp`, data)
        .then(response => {
            console.log("response recieved from settleUp req", response);
            dispatch({
                type: SETTLE_UP,
                payload: response.data
            })
        })
        .catch(error => {
            console.log("error recieved from settleUp req", error);
            dispatch({
                type: ERROR,
                payload: error
            })
        });
}
