import { UPDATE_USER_PROFILE } from "../types";

const initialState = {
    userProfile: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_USER_PROFILE:
            console.log("reducing UPDATE_USER_PROFILE type------", state);
            return { ...state, userProfile: action.payload };
        default:
            return state;
    }
};