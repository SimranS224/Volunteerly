import React from 'react';
import { Route, Router, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux'; 

import { LoginPage } from '../LoginPage';
import { HomePage } from '../HomePage';

import Navbar from '../components/Navbar/Navbar.jsx';

import { createBrowserHistory } from 'history';
  
import { browserHistory } from '../_helpers';
import { ProfilePage } from '../ProfilePage';
import "./General.css";

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
                        <Route path="/login" component={LoginPage} />
                        <Route path="/profile" component={ProfilePage} />
                        
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
