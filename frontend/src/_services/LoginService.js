

const register = () => {
  // cannot implement until we have a backend 
}

const login = (userName, password) => {

  console.log("login service")
  let res = {
    user: `${userName}`, 
    password: `${password}`, // return password for now for testing purposes 
    userID: 1,
    token: `some_jwt_token`,
  }
  // mock database stub
  let level = null
  if(userName== 'user' && password == 'user'){
    console.log("logged in as user")
    level = 0
  }
  else if(userName == 'admin' && password == 'admin'){
    console.log("logged in as admin")
    level = 1
  }
  res.level = level
  return { success: level === null ? false : true, response: res }
}

const logout = () => {
  return { success: true }
}


export const loginService = {
  register,
  login, 
  logout
}