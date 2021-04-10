import { SETTLE_UP, GET_ALL_USER_EXPENSES } from "../types";

const initialState = {
    allUserExpenses: {},
    settleUp: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_USER_EXPENSES:
            console.log("reducing GET_ALL_USER_EXPENSES type-----");
            return { ...state, allUserExpenses: action.payload };
        case SETTLE_UP:
            console.log("reducing SETTLE_UP type------", state);
            return { ...state, settleUp: action.payload };
        default:
            return state;
    }
};