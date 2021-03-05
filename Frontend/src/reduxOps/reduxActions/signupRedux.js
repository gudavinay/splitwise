import Axios from "axios";
import backendServer from '../../webConfig';
import { SIGNUP, ERROR } from "../types";
export const signupRedux = (data) => async dispatch => { 
    await Axios.post(`${backendServer}/signup`, data)
        .then(response => {
            console.log("response recieved from signup req", response);
            dispatch({
                type: SIGNUP,
                payload: response.data
            })
        })
        .catch(error => {
            console.log("error recieved from signup req", error);
            dispatch({
                type: ERROR,
                payload: error
            })
        });
}