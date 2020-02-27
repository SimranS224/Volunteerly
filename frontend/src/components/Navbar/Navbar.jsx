
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

import Drawer from '@material-ui/core/Drawer';
import './Navbar.css';

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
        showNav: false
      });
    console.log(props);

    const toggleSidebar = function() {
        setState({
            showNav: !state.showNav
        })
    }
    
    return (
      <div className="Navbar">
        <Drawer open={state.showNav} onClose={toggleSidebar}>
            <div className={"Sidebar"} onClick={toggleSidebar}>
                <List>
                    <Link to="/home">
                        <ListItem button key={"Home"}>
                            Home
                        </ListItem>
                    </Link>
                    <Link to="/profile">
                        <ListItem button key={"Profile"}>
                            <Link to="/profile">Profile</Link>
                        </ListItem>
                    </Link>
                    <Link to="/admin">
                        <ListItem button key={"Admin"}>
                            <Link to="/admin">Admin</Link>
                        </ListItem>
                    </Link>
                </List>
            </div>
        </Drawer>

        <AppBar className="AppBar" position="static">
            <IconButton onClick={toggleSidebar} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <h4>
                <Link to="/home">Volunteer App</Link>
            </h4>
            <IconButton>
                <Link to="/profile"><AccountCircle /></Link>
            </IconButton>
            <Button className="Login"><Link to="/login">Login</Link></Button>
        </AppBar>
      </div>
    );
}

const mapDispatchToProps = null

const mapStateToProps = (state, ownProps) => ({
    the_state: state
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);