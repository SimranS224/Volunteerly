import React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {userService} from '../_services/UserService.js'
import CardWithButton from '../components/General/CardWithButton'
import List from '@material-ui/core/List';
import { ListItem } from '@material-ui/core';
import { userActions } from "../_redux/_actions";
import ImageUploader from "react-images-upload";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import '../components/Modals/PreferencesModal.css';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import QRCode from 'qrcode.react';

import './AdminPage.css';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const initialState = {
    eventTitle: '',
    eventDescription: '',
    location: '',
    startDate: new Date('2019-08-18T21:11:54'),
    endDate: new Date('2019-08-18T21:11:54'),
    startTime: new Date(),
    endTime: new Date(),
    currentDateTime: new Date(), 
    error: false
};

const intialEventTypes = {
    "Cleanup": false,
    "Hospital": false,
    "Translation": false,
    "Fundraising": false,
    "Homeless": false,
    "Elderly or Disabled": false,
    "Research": false, 
    "Refugees or Migrants": false,
    "Trustee": false 
}


class AdminPage extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {...initialState, 
                      eventTypes: JSON.parse(JSON.stringify(intialEventTypes)),
                      data: [],
                      pictures: [],
                      addEventErrors: [],
                      addEventErrors: []// use for displaying to the user when an event 
                     };
    }
    

    componentDidMount() {
        let events =  userService.getEvents(null);
        this.props.updateEvents(events)

        if (this.props.globalEvents) {
          this.setState({data: this.props.globalEvents, filtered: this.props.globalEvents})
        } else {
          this.setState({data: events, filtered: events})
        }

        if (!this.state.error){
            this.setState({error: false});
        }
    }

    verifyValidEvent = () => {
        const state  = this.state;
        let errors = [];
        if (!state.eventTitle.length || state.eventTitle.length <= 4 ){
            errors.push("Event Title needs to be longer than 4 characters ");
        } 
        if (!state.location || state.location.length <= 4 ){
            errors.push("Event Location needs to be longer than 4 characters ");
        } 
        if (state.startDate <= state.currentDateTime){
            errors.push("Invalid start date");
        } 
        if (state.endDate <= state.currentDateTime){
            errors.push("Invalid end date");
        } 
        if (state.startDate > state.endDate) {
            errors.push("Start date cannot be after end date");
        }
        if (state.startTime >= state.endTime){
            errors.push("Invalid start and end time");
        } 
        if (!state.pictures){
            errors.push("Please select one more pictures describing your event");
        } 
        if (!state.error){
            errors.push("Invalid event type");
        }
        if (!errors.length){
            return [true, []];
        } else { 
            return [false, errors];
        }
    }

    getDuration() {
        const duration = Math.abs(this.state.startTime - this.state.endTime) / 36e5
        console.log({duration});
        const decimals = (duration % 1) * 60
        console.log({decimals});
        
        let rounded_duration;
        if (decimals < 15){
            rounded_duration = Math.floor(duration)
        } else if (decimals < 45){
            rounded_duration = Math.floor(duration) + 0.30
        } else {
            rounded_duration = Math.ceil(duration)
        }

        console.log({rounded_duration});
        return rounded_duration
    }

    getTimeRange() {
        const startTimeAsString = this.state.startTime.toLocaleString('en-US', { hour: 'numeric', hour12: true })
        const endTimeAsString =  this.state.endTime.toLocaleString('en-US', { hour: 'numeric', hour12: true })
        return startTimeAsString + "-" + endTimeAsString
    }
   

    addEvent = async () => {

        // verify all fields are filled, if not show an error 
        console.log("Adding event")
        const isValid = this.verifyValidEvent()
        if (!isValid[0]){
            this.setState({addEventErrors: isValid[1]});
            console.log("Could not add event"); // alert at this point
            return 
        }
        const state = this.state
        // create new event 
        const newEvent = {
            name: state.eventTitle,
            start_date: state.startDate,
            end_date: state.endDate,
            description: state.eventDescription,
            location:state.location,
            photo_url: state.pictures,
            organization_id: this.props.curUser.id,
            duration: this.getDuration(),
            timeRange: this.getTimeRange()
        }


        // sent to user service 
        console.log("Added event ");
        console.log({newEvent});

        
        // try { 
        //     await userService.addEvent({event: newEvent, token: this.props.curUser.token});
        //     this.props.addEvent(newEvent)

        // } catch (err) {
        //     console.log(`Error adding event: ${err}`)
        // }


        // reset state 
        const previousstate = this.state
        console.log({previousstate})

        
        this.setState({...initialState, 
            eventTypes: JSON.parse(JSON.stringify(intialEventTypes)),
            data: this.props.globalEvents,
            pictures: [],
            addEventErrors: [],
            filtered: this.props.globalEvents,
            addEventErrors: []
           });
        console.log({initialState});
        console.log({intialEventTypes});
        
        // console.log({curUser})
        // this.props.addEvent({user: this.props.curUser.user, title: this.state.eventTitle, desc: this.state.eventDescription, type:'Clean Up', date:this.state.eventDate, pictures: this.state.pictures})
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

    locationChange(e){
        this.setState({location: e.target.value});
    }

    startDateChange(day){
        console.log({day});
        this.setState({startDate: day});
    }  
    
    endDateChange(day){
        console.log({day});
        this.setState({endDate: day});
    }  

    startTimeChange(time){
        console.log("here")
        const stringTime = time.toString().slice(16, 24)
        console.log({stringTime});

        this.setState({startTime: time});
    }  
    
    endTimeChange(time){

       
        const stringTime = time.toString().slice(16, 24)
        console.log({stringTime});
        
        this.setState({endTime: time});
    } 


    onDrop(pictureFiles) {
        console.log({pictureFiles})
        this.setState({
            pictures: pictureFiles
        });
    }

    handleClose() {
        this.setState({showEventAddSuccess: false});
    }
    updateHandler = name => event => {
        let newState = Object.assign({}, this.state);
        newState.eventTypes[`${name}`]= event.target.checked
        this.setState(newState); 
        console.log("updte");
        
        this.setState({error: Object.keys(this.state.eventTypes).filter(event => this.state.eventTypes[`${event}`]).length === 1
        })
    };


  render() {
    // const eventTypes = this.state.eventTypes;
    // console.log({eventTypes})
    // const er = this.state.error;
    // console.log({er});
    // let verifyerror = this.verifyValidEvent()[1]
    // console.log({verifyerror})
    // console.log(this.state.endDate <= this.state.currentDateTime);
    // console.log(this.state.endDate);
    // console.log(this.state.currentDateTime);
    // const pics = this.state.pictures
    // console.log({pics})
    // convert to string 
    const addErrors = this.state.addEventErrors
    console.log({addErrors})
    const afterState = this.state
    console.log({afterState});
    
    // const startTimeAsString = this.state.startTime.toLocaleString('en-US', { hour: 'numeric', hour12: true })
    // const endTimeAsString =  this.state.endTime.toLocaleString('en-US', { hour: 'numeric', hour12: true })
    // const timeRange = startTimeAsString + "-" + endTimeAsString
    // console.log({timeRange});
    
    return (
        <div className="AdminPage">
            <div className="AddEvent-Section">
            <h2 className="header">Add Event</h2>
            <div className="AddEvent">
                <Snackbar open={this.state.showEventAddSuccess} 
                            autoHideDuration={6000}
                            onClose={this.handleClose.bind(this)}
                            anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                    <Alert onClose={this.handleClose.bind(this)} severity="success">
                        Successfully added an event 
                    </Alert>
                </Snackbar>
                <form noValidate autoComplete="off">
                    <div className="group">
                        <TextField id="standard-basic" label="Event Name" value={this.state.eventTitle} onChange={this.titleChange.bind(this)}/>
                    </div>
                    <div className="group">
                        <TextField id="standard-basic" label="Description" multiline={true} rows={5} value={this.state.eventDescription} onChange={this.descriptionChange.bind(this)} />
                    </div>
                    <div className="group">
                        <TextField id="standard-basic" label="Location" multiline={true} rows={5} value={this.state.location} onChange={this.locationChange.bind(this)} />
                    </div>
                    <div className="root">

                    <FormControl required error={!this.state.error} component="fieldset" className="formControl">
                        <FormLabel component="legend">Pick one (i.e the one that matches your event the most) </FormLabel>
                        <FormGroup>
                        {
                            Object.keys(this.state.eventTypes).map((event, i) =>{
                                return <FormControlLabel key={`${event}`}
                                    control={<Checkbox checked={this.state.eventTypes.event} onChange={this.updateHandler(event)} name={`${event}`} />}
                                    label={`${event}`}
                                />
                        })}
                        </FormGroup>
                        <FormHelperText>Please only choose one</FormHelperText>
                    </FormControl>
                    </div>
                    <div className="group">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>

                    <Grid container justify="space-around">
                        <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="Start Date"
                                format="MM/dd/yyyy"
                                value={this.state.startDate}
                                onChange={val => {this.startDateChange(val)}}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                        />
                        <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="End Date"
                        format="MM/dd/yyyy"
                        value={this.state.endDate}
                        onChange={val => {this.endDateChange(val)}}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        />
                        </Grid>
                    </MuiPickersUtilsProvider>
                    </div>
                    <div className="group">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>

                    <Grid container justify="space-around">
                        <KeyboardTimePicker
                        margin="normal"
                        id="time-picker"
                        label="Start Time"
                        value={this.state.startTime}
                        onChange={val => {this.startTimeChange(val)}}
                        KeyboardButtonProps={{
                            'aria-label': 'change time',
                        }}
                        />

                        <KeyboardTimePicker
                        margin="normal"
                        id="time-picker"
                        label="End Time"
                        value={this.state.endTime}
                        onChange={val => {this.endTimeChange(val)}}
                        KeyboardButtonProps={{
                            'aria-label': 'change time',
                        }}
                        />
                    </Grid>
                    </MuiPickersUtilsProvider>
                    </div>
                    <div>
                    <ImageUploader
                        withIcon={true}
                        withPreview={true}
                        buttonText="Choose images"
                        onChange={this.onDrop.bind(this)}
                        imgExtension={[".jpg", ".gif", ".png", ".jpeg", ".JPG", ".GIF", ".PNG", ".JPEG"]}
                        maxFileSize={5242880}
                        />
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
                    {
                        this.state.data.length > 0 && this.state.data.map((event, i) =>{
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
        updateEvents: (curUser, events) => {
            dispatch(userActions.updateEvents(curUser, events))
        }
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
