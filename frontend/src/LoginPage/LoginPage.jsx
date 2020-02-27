import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { FormControl } from '@material-ui/core';
import './LoginPage.css'

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        username: '',
        password: '',
        provided: false
    };
  }


  render() {
    return (
      <div className="container">
        <div className="login">
          <FormControl className="form">
            <TextField id="email"  required placeholder="email" variant="outlined" />
            <TextField id="password"  type="password" autoComplete="current-password" required placeholder="password" variant="outlined" />
            <Button variant="contained" color="primary"  value="Submit" >
                LogIn
            </Button>
            <div>Not registered yet?</div>
            <Button variant="contained" color="primary" value="Submit">
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
    login: (username, password) => {
      dispatch(login(username, password))
    }
  } 
}
const mapState = null;

const Loginconnected =  connect(mapState, mapDispatchToProps)(LoginPage);
export { Loginconnected as LoginPage};