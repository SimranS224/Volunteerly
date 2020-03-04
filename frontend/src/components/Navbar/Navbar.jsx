
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import store from 'store'
import Drawer from '@material-ui/core/Drawer';
import './Navbar.css';
import { PreferencesModal } from '../Modals/PreferencesModal';
import { userActions } from "../../_redux/_actions";


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));


function Navbar(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        showNav: false,
        loggedIn: false
      });

    const toggleSidebar = function() {
        setState({
            showNav: !state.showNav
        })
    }
    if(props.userReducer.loggedIn === true && state.loggedIn !== true){
        setState({loggedIn: true, showNav: state.showNav})
    }
    return (
      <div className="Navbar">
        <Drawer open={state.showNav} onClose={toggleSidebar}>
            <div className="Sidebar" onClick={toggleSidebar}>
                <List>
                    <Link to="/home">
                        <ListItem button key={"Home"}>
                            Home
                        </ListItem>
                    </Link>
                    <Link to="/profile">
                        <ListItem button key={"Profile"}>
                            Profile
                        </ListItem>
                    </Link>
                    <Link to="/admin">
                        <ListItem button key={"Admin"}>
                            Admin
                        </ListItem>
                    </Link>
                </List>
            </div>
        </Drawer>

        <AppBar className="AppBar" position="static">
            <div className="container">
              <IconButton onClick={toggleSidebar} edge="start" className={classes.menuButton} aria-label="menu" className="MenuIcon">
              <MenuIcon />
              </IconButton>
              <h4>
                  <Link className="logo" to="/home">Volunteerly</Link>
              </h4>
              <IconButton>
                  <Link to="/profile"><AccountCircle /></Link>
              </IconButton>
              <Button className="Preferences"><PreferencesModal/></Button>
              <Button className="Login" onClick={() => {props.logout(); setState({loggedIn: false})}}><Link to="/login">{state.loggedIn !== true ? "Login" : "Logout"}</Link></Button>
            </div>
        </AppBar>
      </div>
    );
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
        dispatch(userActions.logout())
    }
  } 
}

const mapStateToProps = state => {
  return {
      userReducer: state.userReducer
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);