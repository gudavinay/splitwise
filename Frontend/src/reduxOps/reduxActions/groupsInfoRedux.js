import Axios from "axios";
import backendServer from '../../webConfig';
import { ADD_EXPENSE, GET_ALL_EXPENSES, GET_ALL_INDIVIDUAL_EXPENSES, EXIT_GROUP, ERROR } from "../types";

export const getAllExpensesRedux = (data) => async dispatch => { 
    await Axios.post(`${backendServer}/getAllExpenses`, data)
        .then(response => {
            console.log("response recieved from getAllExpenses req", response);
            dispatch({
                type: GET_ALL_EXPENSES,
                payload: response.data
            })
        })
        .catch(error => {
            console.log("error recieved from getAllExpenses req", error);
            dispatch({
                type: ERROR,
                payload: error
            })
        });
}

export const getAllIndividualExpensesRedux = (data) => async dispatch => { 
    await Axios.post(`${backendServer}/getAllIndividualExpenses`, data)
        .then(response => {
            console.log("response recieved from getAllIndividualExpenses req", response);
            dispatch({
                type: GET_ALL_INDIVIDUAL_EXPENSES,
                payload: response.data
            })
        })
        .catch(error => {
            console.log("error recieved from getAllIndividualExpenses req", error);
            dispatch({
                type: ERROR,
                payload: error
            })
        });
}

export const addExpenseRedux = (data) => async dispatch => { 
    await Axios.post(`${backendServer}/addExpense`, data)
        .then(response => {
            console.log("response recieved from addExpense req", response);
            dispatch({
                type: ADD_EXPENSE,
                payload: response.data
            })
        })
        .catch(error => {
            console.log("error recieved from addExpense req", error);
            dispatch({
                type: ERROR,
                payload: error
            })
        });
}



export const exitGroupRedux = (data) => async dispatch => { 
    await Axios.post(`${backendServer}/exitGroup`, data)
        .then(response => {
            console.log("response recieved from exitGroup req", response);
            dispatch({
                type: EXIT_GROUP,
                payload: response.data
            })
        })
        .catch(error => {
            console.log("error recieved from exitGroup req", error);
            dispatch({
                type: ERROR,
                payload: error
            })
        });
}

