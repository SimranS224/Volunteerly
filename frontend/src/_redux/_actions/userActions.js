import { browserHistory } from '../../_helpers'; 
import { allConstants } from './constants';
import { loginService } from '../../_services'

const register = () => {
 
}

const login = (userName, password) => {
  // try to login with loginService
  
  try {
    const res = loginService.login(userName, password);
    if (res.success) {
      
      browserHistory.push("/home")
      return {type: allConstants.LOGIN, success: true, curUser: res.response, isAdmin: res.response.level === 1} 
    }
  } catch (err) {
    return {type: allConstants.LOGIN, success: false, curUser: null, isAdmin: false} 
  }
}

const logout = () => {
  loginService.logout();
  return { type: allConstants.LOGOUT }
}

const deleteEvent = (event) => {
  return {type: allConstants.DELETE_EVENT, event: event} 
}

const addEvent = (event) => {
  return {type: allConstants.ADD_EVENT, event: event} 
}

const updateEvents = (events) => {
  return {type: allConstants.UPDATE_EVENTS, event: events} 
}

const setPreferences = (preferencesState) => {
  return {type: allConstants.SET_PREFERENCES, newPreferenceState: preferencesState} 
}

const searchEvents = (searchQuery) => {
  return {type: allConstants.SEARCH_EVENTS, searchQuery: searchQuery}
}

export const userActions = {
  setPreferences, 
  register, 
  login, 
  logout,
  updateEvents,
  addEvent,
  deleteEvent,
  searchEvents
}