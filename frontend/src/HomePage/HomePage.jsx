import React from 'react';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {userService} from '../_services/UserService.js'
import { eventService } from '../_services/EventsService.js'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';
import DialogContent from '@material-ui/core/DialogContent';
import OppCard from '../components/OppCard/OppCard';
import MapContainer from '../components/Maps/MapContainer'
import HeroImage from './welcome-2.png';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import './HomePage.css';
import { userActions } from "../_redux/_actions";
var hdate = require('human-date');
 
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
class HomePage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      data: [],
      dialog_open: false,
      filtered: [],
      selected: null,
      showEnrollmentSuccess: false,
    }
    eventService.getEvents()
      .then((events) => {
        console.log(events);
        this.props.setEvents(events);
      });
  }
  
  componentDidMount() {

  }

  handleSearch = (e) =>{
    // e = e.target.value
    // let filtered = this.state.data.filter(event => {
    //   let keys = Object.keys(event)
    //   for(let i = 0; i < keys.length; i++){
    //     if(event[keys[i]].toLowerCase().indexOf(e.toLowerCase()) > -1){
    //       return true
    //     }
    //   }
    //   return false
    // })
    // this.setState({filtered: filtered})
    this.props.searchEvents(e.target.value)
  } 

  enrollUser = (event) => {
    if(event === undefined && event === null) {
      return
    }
    userService.enrollInEvent(this.props.curUser.id, event.id)
      .then((res) => {
        if(res.statusCode !== 200) {
          this.setState({
            showEnrollmentSuccess: true,
            dialog_open: false, 
            selected: null
          })
        }
      });
  }

  handleClose = () => {
    this.setState({
      showEnrollmentSuccess: false
    })
  }

  render() {
     let { events } = this.state
      return (
          <div className="HomePage">
              <Snackbar open={this.state.showEnrollmentSuccess} 
                    autoHideDuration={6000}
                    onClose={this.handleClose.bind(this)}
                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                <Alert onClose={this.handleClose.bind(this)} severity="success">
                    Successfully enrolled in event
                </Alert>
              </Snackbar>

              <div className="hero-section">
                <div className="hero-container">
                  <div className="hero-content">
                    <h1> Volunteer </h1>
                    <h3>Make friends, find purpose, and help out</h3>
                    <input ref="query" placeholder=" Search for volunteering opportunities (try: beach cleanup)" type="text" onChange={this.handleSearch}/>
                  </div>
                  <img src={HeroImage} />
                </div>
              </div>
      
      <div className="volunteering-opportunities">
        <List>
              {this.props.events.length > 0 && this.props.events.map((event, i) =>{
               return <ListItem key={'event' + i.toString()}>
                 <OppCard 
                  date={event.start_date}
                  title={event.name}
                  desc={event.description}
                  onClick={() => {this.setState({dialog_open: true, selected: i})}} 
                  />
      <Dialog fullScreen open={this.state.dialog_open} onClose={() =>{this.setState({dialog_open: false, selected: null})}} TransitionComponent={Transition}>
      <AppBar className="EventAppBar">
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={() =>{this.setState({dialog_open: false, selected: null})}} aria-label="close">
              <CloseIcon />
            </IconButton>
            </Toolbar>
        </AppBar>

        <DialogContent>
        <Typography className="event-title" variant="h2"> 
        {this.state.selected !== null ? this.props.events[this.state.selected].name : null}
        </Typography>
        <Button className="primary-button" variant="contained" onClick={() => this.enrollUser(this.props.events[this.state.selected])} 
          disableElevation>
          Enroll
        </Button>
        <Typography className="event-desc" variant="h4"> 
        {this.state.selected !== null ? this.props.events[this.state.selected].description : null}
        </Typography>
        <Typography className="event-date" variant="h4"> 
        Starts {this.state.selected !== null ? hdate.prettyPrint(this.props.events[this.state.selected].start_date, { showTime: true }) : null} 
        <br/>
        Ends {this.state.selected !== null ? hdate.prettyPrint(this.props.events[this.state.selected].end_date, { showTime: true }) : null} 
        <br/>
        Location:
        </Typography>
        <MapContainer selectedPlace={this.props.events[this.state.selected]}/>
        
        </DialogContent>
      </Dialog>
                </ListItem>
              })}
              </List>
          </div>
        </div>
      );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    updateEvents: (curUser, events) => {
      dispatch(userActions.updateEvents(curUser, events))
    },
    searchEvents: (searchQuery) => {
      dispatch(userActions.searchEvents(searchQuery))
    },
    login: (id, statusCode, email, token, level, first_name, last_name, profile_picture_url) => {
      dispatch(userActions.login(id, statusCode, email, token, level, first_name, last_name, profile_picture_url))
    },
    setEvents: (events) => {
      dispatch(userActions.setEvents(events));
    }
  } 
}

const mapStateToProps = state => {
  return {
    curUser: state.userReducer.curUser,
    events: state.userReducer.events,
    }
}

const Homeconnected =  connect(mapStateToProps, mapDispatchToProps)(HomePage);
export { Homeconnected as HomePage};
