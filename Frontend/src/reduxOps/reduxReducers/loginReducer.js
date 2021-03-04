import { LOGIN,LOGOUT } from "../types";

const initialState = {
    user: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            console.log("reducing LOGIN type------", state);
            return { ...state, user: action.payload };
        case LOGOUT:
            console.log("reducing LOGOUT type-----");
            return {};
        default:
            return state;
    }
};