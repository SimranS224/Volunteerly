import React from 'react';
import { Route, Router, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux'; 

import { LoginPage } from '../LoginPage';
import { HomePage } from '../HomePage';

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
     
      
  }

  render() {
      console.log("main.jsx", this.props.userReducer);
      return (
        <Router history={browserHistory}>
            <div className="App">   
                <Navbar />
                    <Switch>
                        <Route path="/home" component={HomePage} />
                        <PrivateRoute admin={false} userReducer={this.props.userReducer} path="/profile" component={ProfilePage} />

                        <Route path="/login" component={LoginPage} />
                        <PrivateRoute admin={true} userReducer={this.props.userReducer} path="/admin" component={AdminPage} />
                  
                        <Redirect from="*" to="/home" />
                        
                    </Switch>
            </div>
        </Router>
      );
  }
}

const mapDispatchToProps = null;


const mapStateToProps = state => {
  return {
      userReducer: state.userReducer
    }
}
const Mainconnected =  connect(mapStateToProps, mapDispatchToProps)(Main);
export { Mainconnected as Main};
