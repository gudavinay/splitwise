import { GET_ALL_EXPENSES_FOR_RA } from "../types";

const initialState = {
    allUserExpensesForRA: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_EXPENSES_FOR_RA:
            console.log("reducing GET_ALL_EXPENSES_FOR_RA type------", state);
            return { ...state, allUserExpensesForRA: action.payload };
        default:
            return state;
    }
};