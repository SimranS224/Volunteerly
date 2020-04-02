import { allConstants } from '../_actions/constants';
import { userService } from '../../_services/UserService'


const initialState = { 
  loggedIn: false, 
  isAdmin: false, 
  curUser: null , 
  preferences: null, 
  _allEvents: [], // list of all events 
  events: [], // When logged in as a user should be enrolled events and when logged in as an organization should be the organization events, when logged in as a admin needs to be all events 
  searchQuery: '',
  enrolledEvents: [],
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
      return {
        ...state,
        events: action.newEvents
      };
    case allConstants.DELETE_EVENT:
      return {
        ...state,
        events: action.newEvents
      };
    case allConstants.UPDATE_EVENTS:
      return {
        ...state,
        events: action.events
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

// const addEvent = (event, curUser) => {
//   return updatedData;
// }

const filterEvents = (events, searchQuery) => {
  console.log("searchquery", searchQuery)
  if(searchQuery === null || searchQuery === undefined || searchQuery === '') {
    return events;
  }
  return events.filter(event => {
    let keys = Object.keys(event)
    for(let i = 0; i < keys.length; i++){
      if(event[keys[i]].toString().toLowerCase().indexOf(searchQuery.toLowerCase()) > -1){
        return true
      }
    }
    return false
  })
}

export default userReducer;
