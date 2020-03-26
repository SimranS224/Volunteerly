import { browserHistory } from '../../_helpers'; 
import { allConstants } from './constants';

const register = async (statusCode) => {
 
    console.log("registering")
    if (statusCode === 200) {
      
      return {type: allConstants.REGISTER, success: true} 
    }
    else if (statusCode === 401){
      alert("Email already exists!")
      return {type: allConstants.REGISTER, success: false} 

    }
    else{
      console.log("failed to add")
      return {type: allConstants.REGISTER, success: false} 

    }
  
}

const login = (id, statusCode, username, token, level) => {
  // try to login with loginService
  

    if (statusCode === 200) {
      browserHistory.push("/home")
      return {type: allConstants.LOGIN, success: true, curUser: {id: id, username: username, token: token, level: level}, isAdmin: level === 1} 
    }
    else if (statusCode === 401){
      alert("Invalid credentials!")
      return {type: allConstants.LOGIN, success: false, curUser: null, isAdmin: false} 

    }
    else{
      alert("Error occured!")
      return {type: allConstants.LOGIN, success: false, curUser: null, isAdmin: false} 
  }
}

const logout = () => {
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