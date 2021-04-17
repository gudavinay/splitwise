import Axios from "axios";
import backendServer from '../../webConfig';
import { GET_ALL_EXPENSES_FOR_RA, ERROR } from "../types";
import { getToken } from '../../components/Services/ControllerUtils';

export const getAllUserExpensesForRecentActivitiesRedux = (data) => async dispatch => { 
    Axios.defaults.headers.common['authorization'] = getToken();
    await Axios.post(`${backendServer}/getAllUserExpensesForRecentActivities`, data)
        .then(response => {
            console.log("response recieved from getAllUserExpensesForRecentActivities req", response);
            dispatch({
                type: GET_ALL_EXPENSES_FOR_RA,
                payload: response.data
            })
        })
        .catch(error => {
            console.log("error recieved from getAllUserExpensesForRecentActivities req", error);
            dispatch({
                type: ERROR,
                payload: error
            })
        });
}
