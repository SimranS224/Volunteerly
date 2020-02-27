import { browserHistory } from '../../_helpers'; 
import { allConstants } from './constants';
import { loginService } from '../../_services'

const register = () => {
 
}

const login = async (userName, password) => {
  // try to login with loginService
  try {
    const response = await loginService.login(userName, password);
    if (response.success) {
      browserHistory.push("/")
      return {type:  allConstants.LOGIN, success: true, curUser: response.res} 
    }
  } catch (err) {
    return {type:  allConstants.LOGIN, success: false, curUser: null} 
  }
}

const logout = () => {
  loginService.logout();
  return { type: allConstants.LOGOUT }
}


export const loginActions = {
  register, 
  login, 
  logout
}