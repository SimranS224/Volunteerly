import { allConstants } from '../_actions/constants';

const initialState = { loggedIn: false, isAdmin: false, curUser: null , preferences: null }

function userReducer(state = initialState, action) {
  switch (action.type) {
    case allConstants.REGISTER:
      return {
        loggingIn: true,
        user: action.user
      };
    case allConstants.LOGIN:
      const updatedUser = updateUser(action.success, action.curUser)
      return Object.assign({}, state, {
        isAdmin: updatedUser.user == "admin",
        loggedIn: action.success,
        curUser: updatedUser,
        preferences: {}
      });
    case allConstants.LOGOUT:
      return { loggedIn: false, curUser: null };
    case allConstants.SET_PREFERENCES:
      return {
        ...state,
        preferences: action.newPreferenceState
      };
    default:
      return state;
  }
}

const updateUser = (success, newUser) => {
  if (success){
    return newUser
  }else {
    return null
  }
}

export default userReducer;
