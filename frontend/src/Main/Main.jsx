import React from 'react';
import { Route, Router, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux'; 
import { userActions } from "../_redux/_actions";

import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage'
import { HomePage } from '../HomePage';
import { EventLoginPage } from '../EventLoginPage';

import Navbar from '../components/Navbar/Navbar.jsx';
  
import { browserHistory } from '../_helpers';
import { ProfilePage } from '../ProfilePage';
import { AdminPage } from '../AdminPage'
import "./General.css";
import store from 'store'

const PrivateRoute = ({ admin, userReducer, component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
      (userReducer.loggedIn === true && ((userReducer.isAdmin === true && admin === true) || (admin === false))) ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
)

class Main extends React.Component {
  constructor(props) {
      super(props);

      // Log the user in automatically if we saved their data from a previous login
      const userData = localStorage.getItem('userData');
      if(userData !== undefined && userData !== null) {
        let user = JSON.parse(userData);
        this.props.login(user.id, user.statusCode, user.username, user.token, user.level,
           user.first_name, user.last_name, user.profile_picture_url)
      }
      
  }

  render() {
      return (
        <Router history={browserHistory}>
            <div className="App">   
                <Navbar />
                    <Switch>
                        <Route path="/home" component={HomePage} />
                        <Route path="/event_login/:id" component={EventLoginPage} />
                        <PrivateRoute admin={false} userReducer={this.props.userReducer} path="/profile" component={ProfilePage} />

                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        <PrivateRoute admin={true} userReducer={this.props.userReducer} path="/admin" component={AdminPage} />
                  
                        <Redirect from="*" to="/home" />
                        
                    </Switch>
            </div>
        </Router>
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
      userReducer: state.userReducer
    }
}
const Mainconnected =  connect(mapStateToProps, mapDispatchToProps)(Main);
export { Mainconnected as Main};
