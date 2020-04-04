import { allConstants } from '../_actions/constants';
import { userService } from '../../_services/UserService'


const initialState = { 
    alertError: false,
    alertSuccess: false
}

function userReducer(state = initialState, action) {
  switch (action.type) {
    case allConstants.REGISTER:
      return {
        ...state
      };
    case allConstants.LOGIN:
      const updatedUser = updateUser(action.success, action.curUser)
      return { ...state,
        isAdmin: action.isAdmin,
        loggedIn: action.success,
        curUser: updatedUser,
        preferences: {}
      };
    case allConstants.LOGOUT:
      localStorage.removeItem('userData'); // remove user data 
      return { ...initialState};
    case allConstants.SET_PREFERENCES:
      let newEvents = userService.getEvents(null, action.newPreferenceState);
      return {
        ...state,
        _allEvents: newEvents,
        events: filterEvents(newEvents, state.searchQuery),
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
    case allConstants.SEARCH_EVENTS:
      newEvents = filterEvents(state._allEvents, state.searchQuery)
      return {
        ...state,
        events: newEvents,
        searchQuery: action.searchQuery
      }
    case allConstants.SET_EVENTS:
      return {
        ...state,
        _allEvents: action.events,
        events: action.events,
      }
    case allConstants.SET_ENROLLED_EVENTS:
      return {
        ...state,
        enrolledEvents: action.enrolledEvents
      }
    default:
      return state;
  }
}



export default alertReducer;
