import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { FormControl } from '@material-ui/core';
import { userActions } from "../_redux/_actions";
import './LoginPage.css'
import store from 'store'
import { browserHistory } from '../_helpers'; 
import {userService} from '../_services/UserService.js'


class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        email: '',
        password: '',
    };

    userService.getEnrolledEvents(1);
  }
  login = async (email, password) =>{
    console.log("login")
    let res = await fetch(process.env.REACT_APP_BACKEND_PORT + '/dev/api/login/', {
        method: 'post',
        body:    JSON.stringify({email: email, password: password}),
        headers: { 'Content-Type': 'application/json' },
    })
    res = await res.json()
    console.log("login res", res)

    this.props.login(res.id, res.statusCode, email, res.token, res.level, res.first_name, res.last_name, res.profile_picture_url)
  
  }

  render() {
    return (
      <div className="container">
        <div className="login">
          <FormControl className="form">
            <TextField id="email"  required placeholder="Email" variant="outlined" onChange={(e)=> {this.setState({'email': e.target.value})}}/>
            <TextField id="password" required type="password" onChange={(e)=> {this.setState({'password': e.target.value})}} autoComplete="current-password" required placeholder="password" variant="outlined" />
            <Button variant="contained" color="primary"  value="Submit" onClick={() => {
              this.login(this.state.email, this.state.password)
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
    login: (id, statusCode, email, token, level, first_name, last_name, profile_picture_url) => {
      dispatch(userActions.login(id, statusCode, email, token, level, first_name, last_name, profile_picture_url))
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