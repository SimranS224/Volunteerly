import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {userService} from '../_services/UserService.js'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

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
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
class HomePage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      data: [],
      dialog_open: false,
      filtered: []
    }
  }
   componentDidMount() {
    let events =  userService.getEvents(null);
    console.log("events", events)
    this.setState({data: events})
  }

  render() {
     let { data } = this.state

      return (
          <div>
              <h1>Current Available Opportunities</h1>
              <List>
              {data.length > 0 && data.map((event, i) =>{
               return <ListItem key={'event' + i.toString()}>
                <Card style={{width: "80%"}} onClick={() =>{this.setState({dialog_open: true})}}>
      <CardHeader
        title={event.title}
        subheader={event.date}
      />

      <CardContent>
      {event.desc}
      </CardContent>
      </Card>
      <Dialog fullScreen open={this.state.dialog_open} onClose={() =>{this.setState({dialog_open: false})}} TransitionComponent={Transition}>
      <AppBar >
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={() =>{this.setState({dialog_open: false})}} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h4" style={{margin: "0 auto"}}>
              {event.title}
            </Typography>
            </Toolbar>
        </AppBar>
        <DialogContent>
 
        <Typography  style={{paddingTop: "10vh", fontSize: "30px"}}> 
        Description
        </Typography>
        <Typography style={{ paddingTop: "5vh", fontSize: "20px"}}> 
        {event.desc}
        </Typography>

        </DialogContent>
      </Dialog>
                </ListItem>
              })}
              </List>
          </div>
      );
  }
}

const mapDispatchToProps = null;
const mapState = null;

const Homeconnected =  connect(mapState, mapDispatchToProps)(HomePage);
export { Homeconnected as HomePage};
