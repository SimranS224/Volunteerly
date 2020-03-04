import React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {userService} from '../_services/UserService.js'
import CardWithButton from '../components/General/CardWithButton'
import List from '@material-ui/core/List';
import { ListItem } from '@material-ui/core';
import { userActions } from "../_redux/_actions";


import './AdminPage.css';

class AdminPage extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
            eventTitle: '',
            eventDescription: '',
            eventDate:'2019-05-24'
        };
    }
    addEvent(event){
        console.log(userService.getEvents('admin'))
        this.props.addEvent({user: this.props.curUser.user, title: this.state.eventTitle, desc: this.state.eventDescription, type:'Clean Up', date:this.state.eventDate})
    }

    deleteEvent(event){
        this.props.deleteEvent(event)
    }

    titleChange(e){
        this.setState({eventTitle: e.target.value});
    }

    descriptionChange(e){
        this.setState({eventDescription: e.target.value});
    }

    dateChange(e){
        this.setState({eventDate: e.target.value});
    }   

  render() {
      return (
          <div className="AdminPage">
              <div className="AddEvent-Section">
                <h2 className="header">Add Event</h2>
                <div className="AddEvent">
                    <form noValidate autoComplete="off">
                        <div className="group">
                            <TextField id="standard-basic" label="Event Name" value={this.state.eventTitle} onChange={this.titleChange.bind(this)}/>
                        </div>
                        <div className="group">
                            <TextField id="standard-basic" label="Description" multiline={true} rows={5} value={this.state.eventDescription} onChange={this.descriptionChange.bind(this)} />
                        </div>
                        <div className="group">
                            <TextField id="standard-basic" type="date" label="Date"  value={this.state.eventDate} onChange={this.dateChange.bind(this)}/>
                        </div>
                        <div className="group">
                            <Button variant="contained" color="primary" onClick={this.addEvent.bind(this)}>
                                Add event
                            </Button>
                        </div>
                    </form>
                </div>
              </div>

              <div className="ManageEvents-Section">
                    <h2 className="header">Manage Events</h2>
                    <List className="events">
                        {userService.getEvents('admin').length > 0 && userService.getEvents('admin').map((event, i) =>{
                            return <ListItem key={'event' + i.toString()} >
                                <CardWithButton event={event} buttonText="Delete" buttonFunc={this.deleteEvent.bind(this)} ></CardWithButton>
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
        deleteEvent: (event) => {
            dispatch(userActions.deleteEvent(event))
        }, 
        addEvent: (event) => {
            dispatch(userActions.addEvent(event))
        },
    } 
  }
  
const mapStateToProps = state => {
    return {
        curUser: state.userReducer.curUser,
        globalEvents: state.userReducer.events,
    }
}

const adminConnected = connect(mapStateToProps, mapDispatchToProps)(AdminPage)
export { adminConnected as AdminPage };
