import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { FormControl } from '@material-ui/core';
import { userActions } from "../_redux/_actions";
import './LoginPage.css'
import store from 'store'
class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        username: '',
        password: '',
    };
  }
  login = async (username, password) =>{
    console.log("login")
    let res = await fetch('http://localhost:3004/dev/api/login/', {
        method: 'post',
        body:    JSON.stringify({email: username, password: password}),
        headers: { 'Content-Type': 'application/json' },
    })
    res = await res.json()
    console.log("register res", res)

      this.props.login(res.id, res.statusCode, username, res.token, res.level)

  }

  render() {
    return (
      <div className="container">
        <div className="login">
          <FormControl className="form">
            <TextField id="email"  required placeholder="email" variant="outlined" onChange={(e)=> {this.setState({'username': e.target.value})}}/>
            <TextField id="password" required type="password" onChange={(e)=> {this.setState({'password': e.target.value})}} autoComplete="current-password" required placeholder="password" variant="outlined" />
            <Button variant="contained" color="primary"  value="Submit" onClick={() => {
              this.login(this.state.username, this.state.password)
            }}>
                Login
            </Button>
            <div>Not registered yet?</div>
            <Button variant="contained" color="primary" value="Submit" onClick={()=> {this.props.history.push('/register')}}>
            Register
            </Button>
          </FormControl>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (id, statusCode, username, token, level) => {
      dispatch(userActions.login(id, statusCode, username, token, level))
    }
  } 
}

const mapStateToProps = state => {
  return {
    curUser: state.curUser
    }
}

const Loginconnected =  connect(mapStateToProps, mapDispatchToProps)(LoginPage);
export { Loginconnected as LoginPage};