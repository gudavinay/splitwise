import { FETCH_GROUPS, ACCEPT_INVITE } from "../types";

const initialState = {
    groupsInfo: {},
    acceptInvite: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_GROUPS:
            console.log("reducing FETCH_GROUPS type-----");
            return { ...state, groupsInfo: action.payload };
        case ACCEPT_INVITE:
            console.log("reducing ACCEPT_INVITE type------", state);
            return { ...state, acceptInvite: action.payload };
        default:
            return state;
    }
};