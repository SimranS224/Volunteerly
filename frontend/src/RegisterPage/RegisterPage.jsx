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
        username: '',
        password: '',
        name: ''
    };
  }
  register = async (name, userName, password) =>{
    let res = await fetch('http://localhost:3004/dev/api/volunteers/', {
        method: 'post',
        body:    JSON.stringify({name: name, email: userName, password: password}),
        headers: { 'Content-Type': 'application/json' },
    })
    res = await res.json()
    console.log("register res", res)
    if(res.statusCode === 200){
      this.props.history.push('/login')
    }else{
      alert(res.msg)
    }
  }

  render() {
    return (
      <div className="container">
        <div className="login">
        <h3>Register </h3>
          <FormControl className="form">
           <TextField id="name"  required placeholder="Full Name" variant="outlined" onChange={(e)=> {this.setState({'name': e.target.value})}}/>

            <TextField id="email"  required placeholder="Email" variant="outlined" onChange={(e)=> {this.setState({'username': e.target.value})}}/>
            <TextField id="password" required type="Password" onChange={(e)=> {this.setState({'password': e.target.value})}} autoComplete="current-password" required placeholder="password" variant="outlined" />
            <Button variant="contained" color="primary"  value="Submit" onClick={() => {
              this.register(this.state.name, this.state.username, this.state.password)
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
    register: (name, username, password) => {
      dispatch(userActions.register(name, username, password))
    }
  } 
}

const mapStateToProps = state => {
  return {

    }
}

const Registerconnected =  connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
export { Registerconnected as RegisterPage};