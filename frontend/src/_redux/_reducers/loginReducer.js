import { allConstants } from '../_actions/constants';

const initialState = { loggedIn: false, curUser: null }

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case allConstants.REGISTER:
      return {
        loggingIn: true,
        user: action.user
      };
    case allConstants.LOGIN:
      const updatedUser = updateUser(action.success, action.curUser)
      return Object.assign({}, state, {
        loggedIn: action.success,
        curUser: updatedUser
      });
    case allConstants.LOGOUT:
      return { loggedIn: false, curUser: null };
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

export default loginReducer