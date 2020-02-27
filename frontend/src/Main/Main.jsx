import React from 'react';
import { Route, Router, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux'; 

import { LoginPage } from '../LoginPage';
import { HomePage } from '../HomePage';

import { browserHistory } from '../_helpers';
import { ProfilePage } from '../ProfilePage';

class Main extends React.Component {
  constructor(props) {
      super(props);
  }

  render() {
      return (
          <div className="Main">
              <div className="container">
                      <Router history={browserHistory}>
                          <Switch>
                              <Route path="/home" component={HomePage} />
                              <Route path="/login" component={LoginPage} />
                              <Route path="/profile" component={ProfilePage} />
                              
                              <Redirect from="*" to="/home" />
                          </Switch>
                      </Router>
              </div>
          </div>
      );
  }
}

const mapDispatchToProps = null;
const mapState = null;

const Mainconnected =  connect(mapState, mapDispatchToProps)(Main);
export { Mainconnected as Main};
