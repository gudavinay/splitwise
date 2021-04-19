import { NEW_GROUP, FETCH_USERS, UPLOAD_USER_PROFILE_PICTURE } from "../types";

const initialState = {
    fetchUsers: {},
    newGroup: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_USERS:
            console.log("reducing FETCH_USERS type-----");
            return { ...state, fetchUsers: action.payload };
        case NEW_GROUP:
            console.log("reducing NEW_GROUP type------", state);
            return { ...state, newGroup: action.payload };
        case UPLOAD_USER_PROFILE_PICTURE:
            console.log("reducing NEW_GROUP type------", state);
            return { ...state, uploadedFile: action.payload };
        default:
            return state;
    }
};