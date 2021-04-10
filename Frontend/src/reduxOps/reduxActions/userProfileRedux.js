import Axios from "axios";
import backendServer from '../../webConfig';
import { UPDATE_USER_PROFILE, ERROR } from "../types";

export const updateUserProfileRedux = (data) => async dispatch => { 
    await Axios.post(`${backendServer}/updateUserProfile`, data)
        .then(response => {
            console.log("response recieved from updateUserProfile req", response);
            dispatch({
                type: UPDATE_USER_PROFILE,
                payload: response.data
            })
        })
        .catch(error => {
            console.log("error recieved from updateUserProfile req", error);
            dispatch({
                type: ERROR,
                payload: error
            })
        });
}
