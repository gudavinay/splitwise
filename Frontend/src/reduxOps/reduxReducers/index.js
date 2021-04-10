import { combineReducers } from 'redux';
import allGroupsReducer from './allGroupsReducer';
import dashboardReducer from './dashboardReducer';
import editGroupReducer from './editGroupReducer';
import groupsInfoReducer from './groupsInfoReducer';
import loginReducer from './loginReducer';
import newGroupReducer from './newGroupReducer';
import signupReducer from './signupReducer';

export default combineReducers({
    login: loginReducer,
    signup: signupReducer,
    dashboard: dashboardReducer,
    allGroups: allGroupsReducer,
    editGroup: editGroupReducer,
    groupsInfo: groupsInfoReducer,
    newGroup: newGroupReducer
});

// const rootReducer = (state, action) => {
//   if (action.type === 'USER_LOGOUT') {
//     state = undefined
//   }

//   return appReducer(state, action)
// }