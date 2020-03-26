import { browserHistory } from '../../_helpers'; 
import { allConstants } from './constants';
import { loginService } from '../../_services'

const register = async (name, username, password) => {
 try {
    console.log("registering")
    const res = loginService.register(name, username, password);
    if (res.success) {
      
      return {type: allConstants.REGISTER, success: true} 
    }
    else{
      console.log("failed to add")
      console.log(res.msg)
      return {type: allConstants.REGISTER, success: false} 

    }
  } catch (err) {
    console.log("error?", err)
    return {type: allConstants.REGISTER, success: false} 
  }
}

const login = (id, statusCode, username, token, level) => {
  // try to login with loginService
  

    if (statusCode === 200) {
      browserHistory.push("/home")
      return {type: allConstants.LOGIN, success: true, curUser: {id: id, username: username, token: token, level: level}, isAdmin: level === 1} 
    }
    else{
      return {type: allConstants.LOGIN, success: false, curUser: null, isAdmin: false} 
  }
}

const logout = () => {
  browserHistory.push("/home")
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