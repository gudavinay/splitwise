import { combineReducers } from 'redux';
import allGroupsReducer from './allGroupsReducer';
import dashboardReducer from './dashboardReducer';
import loginReducer from './loginReducer';
import signupReducer from './signupReducer';

export default combineReducers({
    login: loginReducer,
    signup: signupReducer,
    dashboard: dashboardReducer,
    allGroups: allGroupsReducer
});

// const rootReducer = (state, action) => {
//   if (action.type === 'USER_LOGOUT') {
//     state = undefined
//   }

//   return appReducer(state, action)
// }