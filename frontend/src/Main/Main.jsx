import React from 'react';
import { Route, Router, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux'; 

import { LoginPage } from '../LoginPage';
import { HomePage } from '../HomePage';

import Navbar from '../components/Navbar/Navbar.jsx';

import { createBrowserHistory } from 'history';
  
import { browserHistory } from '../_helpers';
import { ProfilePage } from '../ProfilePage';
import { AdminPage } from '../AdminPage'
import "./General.css";
import store from 'store'

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        store.get('auth') === true ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

class Main extends React.Component {
  constructor(props) {
      super(props);
  }

  render() {
      return (
        <Router history={browserHistory}>
            <div className="App">   
                <Navbar />
                <div className="container">
                    <Switch>
                        <Route path="/home" component={HomePage} />
                        <PrivateRoute path="/profile">
                          <ProfilePage />
                        </PrivateRoute>
                        <Route path="/login" component={LoginPage} />
=                        <PrivateRoute path="/admin">
                          <AdminPage />
                        </PrivateRoute>
                        <Redirect from="*" to="/home" />
                        
                    </Switch>
                </div>
            </div>
        </Router>
      );
  }
}

const mapDispatchToProps = null;
const mapState = null;

const Mainconnected =  connect(mapState, mapDispatchToProps)(Main);
export { Mainconnected as Main};
