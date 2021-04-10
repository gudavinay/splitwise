import { NEW_GROUP, FETCH_USERS } from "../types";

const initialState = {
    fetchUsers: {},
    newGroup: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_USERS:
            console.log("reducing FETCH_USERS type-----");
            return { ...state, resp: action.payload };
        case NEW_GROUP:
            console.log("reducing NEW_GROUP type------", state);
            return { ...state, newGroup: action.payload };
        default:
            return state;
    }
};