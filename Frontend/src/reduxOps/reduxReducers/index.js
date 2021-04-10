import { combineReducers } from 'redux';
import { updateUserProfileRedux } from '../reduxActions/userProfileRedux';
import allGroupsReducer from './allGroupsReducer';
import dashboardReducer from './dashboardReducer';
import editGroupReducer from './editGroupReducer';
import groupsInfoReducer from './groupsInfoReducer';
import loginReducer from './loginReducer';
import newGroupReducer from './newGroupReducer';
import recentActivitiesReducer from './recentActivitiesReducer';
import signupReducer from './signupReducer';

export default combineReducers({
    login: loginReducer,
    signup: signupReducer,
    dashboard: dashboardReducer,
    allGroups: allGroupsReducer,
    editGroup: editGroupReducer,
    groupsInfo: groupsInfoReducer,
    newGroup: newGroupReducer,
    updateUserProfile: updateUserProfileRedux,
    recentActivities: recentActivitiesReducer
});

// const rootReducer = (state, action) => {
//   if (action.type === 'USER_LOGOUT') {
//     state = undefined
//   }

//   return appReducer(state, action)
// }