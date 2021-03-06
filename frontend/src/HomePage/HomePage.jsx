import React from 'react';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
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
import Event from '../components/Event/Event';
import HeroImage from './welcome-2.png';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import './HomePage.css';
import { userActions } from "../_redux/_actions";
import { toast } from 'react-toastify';
 
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
        dialog_open: false,
        filtered: [],
        data: [],
        selected: null,
        showEnrollmentSuccess: false
    }
    eventService
        .getEvents()
        .then((events) => {
            this
                .props
                .setEvents(events);
            this.setState({filtered: events, data: events})

        });
  }
  
  areSameObject = (a, b) => {
    let areSame = true;
    for(let propertyName in a) {
       if(a[propertyName] !== b[propertyName]) {
          areSame = false;
          break;
       }
    }
    return areSame;
  }

  componentDidUpdate() {
    const newEvents = this.props.preferredEvents
    console.log({newEvents});
    if (!(this.areSameObject(this.props.preferredEvents,this.state.data)) || !(this.areSameObject(this.props.preferredEvents,this.state.filtered))){
      if (this.props.preferredEvents.length > 0){
        this.setState({data: this.props.preferredEvents , filtered: this.props.preferredEvents})
      }
    }
  }

  handleSearch = (e) =>{
    e = e.target.value
    if(e.trim() == ''){
      this.setState({filtered: this.state.data})
    }
    let filtered = this.state.data.filter(event => {
      let keys = Object.keys(event)
      for(let i = 0; i < keys.length; i++){
        console.log(event[keys[i]])

        if(event[keys[i]].toString().toLowerCase().indexOf(e.toLowerCase()) > -1){
          return true
        }
      }
      return false
    })
    this.setState({filtered: filtered})
    // this.props.searchEvents(e.target.value)
  } 

  enrollUser = (event, curUser) => {
    if(curUser === undefined || curUser === null) {
      toast('Please login to enroll in an event', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      this.setState({
        dialog_open: false, 
        selected: null
      })
      return
    }
    userService.enrollInEvent(curUser.id, event.id)
      .then((res) => {
        if(res.statusCode === 200) {
          this.setState({
            showEnrollmentSuccess: true,
            dialog_open: false, 
            selected: null
          })
        } else {
          toast('Failed to enroll in event', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          });
        }
      });
  }

  handleClose = () => {
    this.setState({
      showEnrollmentSuccess: false
    })
  }

  render() {
     let { filtered } = this.state

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
                {filtered.length > 0 && filtered.map((event, i) =>{
                return <ListItem key={'event' + i.toString()}>
                  <OppCard 
                    date={event.start_date}
                    title={event.name}
                    description={event.description}
                    onClick={() => {this.setState({dialog_open: true, selected: i})}} 
                    />
                  </ListItem>
                })}
          </List>
          
          <Dialog fullScreen open={this.state.dialog_open} onClose={() =>{this.setState({dialog_open: false, selected: null})}} TransitionComponent={Transition}>
            <DialogContent>
              <AppBar className="EventAppBar">
                  <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() =>{this.setState({dialog_open: false, selected: null})}} aria-label="close">
                      <CloseIcon />
                    </IconButton>
                    </Toolbar>
                </AppBar>
                {this.state.selected !== null ? <Event event={filtered[this.state.selected]} enrollUser={this.enrollUser} curUser={this.props.curUser}></Event> : null}
            </DialogContent>
          </Dialog>
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
    preferredEvents: state.userReducer.preferredEvents
    }
}

const Homeconnected =  connect(mapStateToProps, mapDispatchToProps)(HomePage);
export { Homeconnected as HomePage};
