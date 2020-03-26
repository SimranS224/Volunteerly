import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { FormControl } from '@material-ui/core';
import { userActions } from "../_redux/_actions";
import './RegisterPage.css'
import store from 'store'
class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        email: '',
        password: '',
        first_name: '',
        last_name: ''
    };
  }
  register = async (first_name, last_name, email, password) =>{
    let res = await fetch('http://localhost:3004/dev/api/volunteers/', {
        method: 'post',
        body:  JSON.stringify({first_name: first_name, last_name: last_name, email: email, password: password}),
        headers: { 'Content-Type': 'application/json' },
    })
    res = await res.json()
    console.log("register res", res)
    this.props.register(res.statusCode)
    this.props.login(res.id, res.statusCode, res.email, res.token, res.level)
    if(res.statusCode === 200){
      this.props.history.push("/home")
    }

  }

  render() {
    return (
      <div className="container">
        <div className="login">
        <h3>Register </h3>
          <FormControl className="form">
           <TextField id="first_name"  required placeholder="First Name" variant="outlined" onChange={(e)=> {this.setState({'first_name': e.target.value})}}/>
           <TextField id="last_name"  required placeholder="Last Name" variant="outlined" onChange={(e)=> {this.setState({'last_name': e.target.value})}}/>

            <TextField id="email"  required placeholder="Email" variant="outlined" onChange={(e)=> {this.setState({'email': e.target.value})}}/>
            <TextField id="password" required type="Password" onChange={(e)=> {this.setState({'password': e.target.value})}} autoComplete="current-password" required placeholder="password" variant="outlined" />
            <Button variant="contained" color="primary"  value="Submit" onClick={() => {
              this.register(this.state.first_name, this.state.last_name, this.state.email, this.state.password)
            }}>
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
    register: (statusCode) => {
      dispatch(userActions.register(statusCode))
    },
    login: (id, statusCode, email, token, level) => {
      dispatch(userActions.login(id, statusCode, email, token, level))
    }
  } 
}

const mapStateToProps = null

const Registerconnected =  connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
export { Registerconnected as RegisterPage};