import { combineReducers } from 'redux';
import allGroupsReducer from './allGroupsReducer';
import dashboardReducer from './dashboardReducer';
import editGroupReducer from './editGroupReducer';
import groupsInfoReducer from './groupsInfoReducer';
import loginReducer from './loginReducer';
import newGroupReducer from './newGroupReducer';
import recentActivitiesReducer from './recentActivitiesReducer';
import signupReducer from './signupReducer';
import userProfileReducer from './userProfileReducer';

export default combineReducers({
    login: loginReducer,
    signup: signupReducer,
    dashboard: dashboardReducer,
    allGroups: allGroupsReducer,
    editGroup: editGroupReducer,
    groupsInfo: groupsInfoReducer,
    newGroup: newGroupReducer,
    updateUserProfile: userProfileReducer,
    recentActivities: recentActivitiesReducer
});

// const rootReducer = (state, action) => {
//   if (action.type === 'USER_LOGOUT') {
//     state = undefined
//   }

//   return appReducer(state, action)
// }