import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { FormControl } from '@material-ui/core';
import { userActions } from "../_redux/_actions";
import './EventLoginPage.css'
import store from 'store'
import { browserHistory } from '../_helpers'; 
import {userService} from '../_services/UserService.js'


class EventLoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };

  }


  render() {
    console.log("LOGGINED IN")
    return (
      <div className="container">
        <div className="login">
      <h2> Signed In!</h2>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = null;

const mapStateToProps = null;
const EventLoginconnected =  connect(mapStateToProps, mapDispatchToProps)(EventLoginPage);
export { EventLoginconnected as EventLoginPage};