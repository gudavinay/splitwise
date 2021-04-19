import Axios from "axios";
import backendServer from '../../webConfig';
import { FETCH_USERS, NEW_GROUP, ERROR, UPLOAD_USER_PROFILE_PICTURE  } from "../types";
import { getToken } from '../../components/Services/ControllerUtils';

export const fetchUsersRedux = (data) => async dispatch => { 
    Axios.defaults.headers.common['authorization'] = getToken();
    await Axios.get(`${backendServer}/fetchUsers`, data)
        .then(response => {
            console.log("response recieved from fetchUsers req", response);
            dispatch({
                type: FETCH_USERS,
                payload: response.data
            })
        })
        .catch(error => {
            console.log("error recieved from fetchUsers req", error);
            dispatch({
                type: ERROR,
                payload: error
            })
        });
}

export const newGroupRedux = (data) => async dispatch => { 
    Axios.defaults.headers.common['authorization'] = getToken();
    await Axios.post(`${backendServer}/newGroup`, data)
        .then(response => {
            console.log("response recieved from newGroup req", response);
            dispatch({
                type: NEW_GROUP,
                payload: response.data
            })
        })
        .catch(error => {
            console.log("error recieved from newGroup req", error);
            dispatch({
                type: ERROR,
                payload: error
            })
        });
}
export const uploadUserProfilePictureRedux = (data) => async dispatch => { 
    Axios.defaults.headers.common['authorization'] = getToken();
    await Axios.post(`${backendServer}/uploadUserProfilePicture`, data)
        .then(response => {
            console.log("response recieved from uploadUserProfilePicture req", response);
            dispatch({
                type: UPLOAD_USER_PROFILE_PICTURE,
                payload: response.data
            })
        })
        .catch(error => {
            console.log("error recieved from uploadUserProfilePicture req", error);
            dispatch({
                type: ERROR,
                payload: error
            })
        });
}
