import { allConstants } from '../_actions/constants';
import { userService } from '../../_services/UserService'


const initialState = { 
  loggedIn: false, 
  isAdmin: false, 
  curUser: null , 
  preferences: null, 
  events: userService.getEvents(null)
}

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
        isAdmin: action.isAdmin,
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
    case allConstants.ADD_EVENT:
      const addedEvents = addEvent(action.event, state.curUser)
      return {
        ...state,
        events: addedEvents
      };
    case allConstants.DELETE_EVENT:
      const deletedEvents = deleteEvent(action.event, state.curUser)
      return {
        ...state,
        events: deletedEvents
      };
    case allConstants.UPDATE_EVENTS:
      return {
        ...state,
        events: action.event
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

const deleteEvent = (event, curUser) => {
  const updatedData = userService.deleteEvent(event, curUser.user);
  return updatedData;
}

const addEvent = (event, curUser) => {
  console.log("hwiofneo");
  
  console.log(curUser.user)
  const updatedData = userService.addEvent(event, curUser.user);
  return updatedData;
}

export default userReducer;
