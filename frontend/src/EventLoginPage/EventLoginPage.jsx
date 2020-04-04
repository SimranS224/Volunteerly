import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { FormControl } from '@material-ui/core';
import { userActions } from "../_redux/_actions";
import './EventLoginPage.css'
import { browserHistory } from '../_helpers'; 
import {userService} from '../_services/UserService.js'
import CryptoJS from 'crypto-js';

class EventLoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        email: '',
        password: '',
        success: false,
        msg: ''
    };

    userService.getEnrolledEvents(1);
  }
  login = async (email, password) =>{
    console.log("login")
    const { encrypted_id } = this.props.match.params
    console.log("encrypted_id", encrypted_id)

    const host = process.env.NODE_ENV !== 'development' ? process.env.REACT_APP_BACKEND_PROD : process.env.REACT_APP_BACKEND_PORT;

    let res = await fetch(host + '/dev/api/login/', {
        method: 'post',
        body:    JSON.stringify({email: email, password: password}),
        headers: { 'Content-Type': 'application/json' },
    })
    res = await res.json()
    console.log("login res", res)
    if(res.statusCode === 200){
        const bytes  = CryptoJS.AES.decrypt(encrypted_id, 'secretKey');
        const event_id = bytes.toString(CryptoJS.enc.Utf8);
        let res2 = await fetch(host + '/dev/api/enrollments/attended/', {
            method: 'post',
            body:    JSON.stringify({user_id: res.id, event_id: event_id}),
            headers: { 'Content-Type': 'application/json' },
          })
        res2 = await res2.json()
          console.log(res2)
          this.setState({success: true, msg: res2.body})
   

    }
  
  }

  render() {
    return (
      <div className="container">
        <div className="login">
          {!this.state.success && <FormControl className="form">
                      <TextField id="email"  required placeholder="Email" variant="outlined" onChange={(e)=> {this.setState({'email': e.target.value})}}/>
                      <TextField id="password" required type="password" onChange={(e)=> {this.setState({'password': e.target.value})}} autoComplete="current-password" required placeholder="password" variant="outlined" />
                      <Button variant="contained" color="primary"  value="Submit" onClick={() => {
                        this.login(this.state.email, this.state.password)
                      }}>
                          Login
                      </Button>
                    </FormControl>
            }
            {this.state.success && <h3>{this.state.msg}</h3>}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = null

const mapStateToProps = state => {
  return {
    curUser: state.curUser
    }
}

const EventLoginconnected =  connect(mapStateToProps, mapDispatchToProps)(EventLoginPage);
export { EventLoginconnected as EventLoginPage};