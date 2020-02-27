import React from 'react';
import { Route, Router, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux'; 

import { LoginPage } from '../LoginPage';
import { HomePage } from '../HomePage';

import Navbar from '../components/Navbar/Navbar.jsx';

import { createBrowserHistory } from 'history';
  

class App extends React.Component {
  constructor(props) {
      super(props);
  }

  render() {
      return (
        <Router history={createBrowserHistory()}>
            <div className="App">   
                <Navbar />
                <div className="container">
                    <Switch>
                        <Route path="/home" component={HomePage} />
                        <Route path="/login" component={LoginPage} />
                        
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

const Appconnected =  connect(mapState, mapDispatchToProps)(App);
export { Appconnected as App};
