import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

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
        <div className="Login">
          <div className="container">
              Login
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