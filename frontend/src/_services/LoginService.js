const fetch = require('node-fetch');

const register = (name, userName, password) => {
  // cannot implement until we have a backend
  fetch('http://localhost:3004/dev/volunteers/', {
        method: 'post',
        body:    JSON.stringify({name: name, email: userName, password: password}),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(json => {
       return {success: json.status, msg: json.msg}
    });
    
}

const login = (userName, password) => {
  let res = {
    user: `${userName}`, 
    password: `${password}`, // return password for now for testing purposes 
    userID: 1,
    token: `some_jwt_token`,
  }
  // mock database stub
  let level = null
  if(userName== 'user' && password == 'user'){
    level = 0
  }
  else if(userName == 'admin' && password == 'admin'){
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