

const register = () => {
  // cannot implement until we have a backend 
}

const login = (userName, password) => {
  // api login calls 
  // try {
  //     let body = {}
  //     console.log({body})
  //     let response = await fetch('http://localhost:' + process.env.REACT_APP_SERVER_PORT + '/login', {
  //         method: 'POST',
  //         headers: { 
  //           Accept: 
  //           'application/json',
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(body),
  //     });
  //     console.log({response});
  //     return response
  // } catch (error) {
  //     toast.error("An error occured!");
  //     console.error(error);
  // }
  // await new Promise(resolve => setTimeout(resolve, 3000));

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