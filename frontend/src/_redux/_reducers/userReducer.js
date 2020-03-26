import { allConstants } from '../_actions/constants';
import { userService } from '../../_services/UserService'


const initialState = { 
  loggedIn: false, 
  isAdmin: false, 
  curUser: null , 
  preferences: null, 
  _allEvents: userService.getEvents(null), // _events is the master list of events
  events: userService.getEvents(null), // events is a filtered list of events from searching
  searchQuery: ''
}

function userReducer(state = initialState, action) {
  switch (action.type) {
    case allConstants.REGISTER:
      return {
        ...state
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
      console.log('searching events', );
      newEvents = filterEvents(state._allEvents, state.searchQuery)
      return {
        ...state,
        events: newEvents,
        searchQuery: action.searchQuery
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

const addEvent = (event, curUser) => {
  const updatedData = userService.addEvent(event, curUser.user);
  return updatedData;
}

const filterEvents = (events, searchQuery) => {
  if(searchQuery === null || searchQuery === undefined || searchQuery === '') {
    return events;
  }
  return events.filter(event => {
    let keys = Object.keys(event)
    for(let i = 0; i < keys.length; i++){
      if(event[keys[i]].toLowerCase().indexOf(searchQuery.toLowerCase()) > -1){
        return true
      }
    }
    return false
  })
}

export default userReducer;
