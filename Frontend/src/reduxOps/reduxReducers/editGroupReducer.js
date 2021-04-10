import { GROUP_MEMBERS, UPDATE_GROUP } from "../types";

const initialState = {
    groupMembers: {},
    updateGroup: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GROUP_MEMBERS:
            console.log("reducing GROUP_MEMBERS type-----");
            return { ...state, groupMembers: action.payload };
        case UPDATE_GROUP:
            console.log("reducing UPDATE_GROUP type------", state);
            return { ...state, updateGroup: action.payload };
        default:
            return state;
    }
};