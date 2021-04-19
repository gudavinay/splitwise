import { ADD_EXPENSE, GET_ALL_EXPENSES, GET_ALL_INDIVIDUAL_EXPENSES, EXIT_GROUP, POST_COMMENT, DELETE_COMMENT } from "../types";

const initialState = {
    allExpenses: {},
    allIndividualExpenses: {},
    addExpense: null,
    exitGroup: null,
    postComment: null,
    deleteComment: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_EXPENSES:
            console.log("reducing GET_ALL_EXPENSES type-----");
            return { ...state, allExpenses: action.payload };
        case GET_ALL_INDIVIDUAL_EXPENSES:
            console.log("reducing GET_ALL_INDIVIDUAL_EXPENSES type------", state);
            return { ...state, allIndividualExpenses: action.payload };
        case ADD_EXPENSE:
            console.log("reducing ADD_EXPENSE type------", state);
            return { ...state, addExpense: action.payload };
        case EXIT_GROUP:
            console.log("reducing EXIT_GROUP type------", state);
            return { ...state, exitGroup: action.payload };
        case POST_COMMENT:
            console.log("reducing POST_COMMENT type------", state);
            return { ...state, postComment: action.payload };
        case DELETE_COMMENT:
            console.log("reducing DELETE_COMMENT type------", state);
            return { ...state, deleteComment: action.payload };
        default:
            return state;
    }
};