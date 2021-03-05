import { SIGNUP } from "../types";

const initialState = {
    user: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SIGNUP:
            console.log("reducing SIGNUP type------", state);
            return { ...state, user: action.payload };
        default:
            return state;
    }
};