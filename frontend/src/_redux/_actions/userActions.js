import { browserHistory } from '../../_helpers'; 
import { allConstants } from './constants';
import { loginService } from '../../_services'

const register = () => {
 
}

const login = (userName, password) => {
  // try to login with loginService
  console.log("here");
  
  try {
    const res = loginService.login(userName, password);
    if (res.success) {
      console.log({res});
      
      browserHistory.push("/")
      return {type: allConstants.LOGIN, success: true, curUser: res.response} 
    }
  } catch (err) {
    return {type: allConstants.LOGIN, success: false, curUser: null} 
  }
}

const logout = () => {
  loginService.logout();
  return { type: allConstants.LOGOUT }
}

const deleteEvent = () => {

}

const addEvent = () => {

}

const getEvents = () => {
  
}

const setPreferences = (preferencesState) => {
  console.log({preferencesState});
  return {type: allConstants.SET_PREFERENCES, newPreferenceState: preferencesState} 
}

export const userActions = {
  setPreferences, 
  register, 
  login, 
  logout
}