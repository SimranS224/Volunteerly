
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';

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


function Navbar() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        showNav: false
      });

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
                    <ListItem button key={"hello world"}>
                        <Link to="/home">Home</Link>
                    </ListItem>
                    <ListItem button key={"hello world"}>
                        <Link to="/profile">Profile</Link>
                    </ListItem>
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

export default Navbar;