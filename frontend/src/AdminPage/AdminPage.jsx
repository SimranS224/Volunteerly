import React from 'react';
import { connect } from 'react-redux';
import { Divider } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import {userService} from '../_services/UserService.js'
import CardWithButton from '../components/General/CardWithButton'
import List from '@material-ui/core/List';
import { ListItem } from '@material-ui/core';

import './AdminPage.css';

class AdminPage extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
            eventTitle: '',
            eventDescription: '',
            eventDate:'2019-05-24'
        };
        this.addEvent = this.addEvent.bind(this)
    }
    addEvent(){
        console.log(userService.getEvents('admin'))
        userService.addEvent({user: 'admin', title: this.state.eventTitle, desc: this.state.eventDescription, type:'Clean Up', date:this.state.eventDate}, 'admin' )
        console.log(userService.getEvents('admin'))
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
              <h2>Add Event</h2>
              <Divider />
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
                        <Button variant="contained" color="primary" onClick={this.addEvent}>
                            Add event
                        </Button>
                    </div>
                </form>

                <h2>Manage Events</h2>
                <Divider />
                <List>
                    {userService.getEvents('admin').length > 0 && userService.getEvents('admin').map((event, i) =>{
                        return <ListItem key={'event' + i.toString()} >
                            <CardWithButton event={event} buttonText="test" buttonFunc={console.log("test")} ></CardWithButton>
                        </ListItem>
                        })}
                </List> 
              </div>
          </div>
      );
  }
}

const mapDispatchToProps = null;
const mapState = null;

const adminConnected = connect(mapState, mapDispatchToProps)(AdminPage)
export { adminConnected as AdminPage };
