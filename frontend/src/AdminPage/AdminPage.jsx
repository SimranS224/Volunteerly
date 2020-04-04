import React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { eventService } from '../_services/EventsService'
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
    error: false,
    organizationError: false,
    alert: ""
};

const intialEventTypes = {
    "Cleanup": false,
    "Hospital": false,
    "Translation": false,
    "Fundraising": false,
    "Homeless": false,
    "Elderly and Disabled": false,
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
                      _image_key: 0,
                      addEventErrors: [],// use for displaying to the user when an event ,
                      organizations: []
                     };
    }
    

    async componentDidMount() {
        let events =  await eventService.getEvents(); 
        console.log({events});
        
        this.props.updateEvents(events, true)
        
        // set organizations array to give options to choose which organization to add event for 
        let fetched_organizations = await eventService.getOrganizations()

        if (this.props.globalEvents) {
            this.setState({data: this.props.globalEvents, filtered: this.props.globalEvents, organizations:fetched_organizations })
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
        const startTimeAsInt = parseInt(this.state.startTime.toLocaleString('en-US', { hour: 'numeric', hour12: false }), 10);
        const endTimeAsInt =  parseInt(this.state.endTime.toLocaleString('en-US', { hour: 'numeric', hour12: false }), 10);
        // const time =  startTimeAsString + "-" + endTimeAsString
        return [startTimeAsInt, endTimeAsInt]
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
            eventType: Object.keys(state.eventTypes).filter((key) => { 
                            console.log(state.eventTypes[`${key}`] );
                            if (state.eventTypes[`${key}`]){
                                return key;
                            }
                        }),
            duration: this.getDuration(),
            start_time: this.getTimeRange()[0],
            end_time: this.getTimeRange()[1]
        }


        // sent to user service 
        console.log("Added event ");
        console.log({newEvent});

        
        try { 
            const updatedEvents = await eventService.addEvent({event: newEvent, token: this.props.curUser.token});
            this.props.addEvent(updatedEvents)

        } catch (err) {
            console.log(`Error adding event: ${err}`)
        }


        // reset state 
        const previousstate = this.state
        console.log({previousstate})

        
        this.setState({...initialState, 
            eventTypes: JSON.parse(JSON.stringify(intialEventTypes)),
            data: this.props.globalEvents,
            pictures: [],
            addEventErrors: [],
            filtered: this.props.globalEvents,
            addEventErrors: [],
            _image_key: this.state._image_key +1,
            alert: "Added Event"
           });
        console.log({initialState});
        console.log({intialEventTypes});
    }

    deleteEvent = async (event) => {
        console.log({event});
        
        try { 
            const updatedEvents = await eventService.deleteEvent({event: event, token: this.props.curUser.token});
            console.log({updatedEvents});
            this.props.deleteEvent(updatedEvents)
        } catch (err) {
            console.log(`Error adding event: ${err}`)
        }

        this.setState({ alert: "Deleted Event",
                        data: this.props.globalEvents
                     })

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

    updateOrganizationHandler = name => event => {
        let curName = name
        console.log(event.target.checked, event.target.name);
        for (let i = 0; i < this.state.organizations.length; i++){
            if (this.state.organizations[i].name == event.target.name){
                this.state.organizations[i].check = event.target.checked;
            }
        }
     
        let count_orgnaizations = 0;
        for (let i = 0; i < this.state.organizations.length;i++){
            if (this.state.organizations[i].check == true){
                count_orgnaizations +=1
            }
        }
        this.setState({organizations: this.state.organizations, organizationError: count_orgnaizations === 1 ? false : true})
    }


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
    // console.log(this.props.curUser)
    const orgs = this.state.organizations
    console.log({orgs});
    
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
                        <FormLabel component="legend">Pick the one that matches the event your adding the most) </FormLabel>
                        <FormGroup>
                        {
                            Object.keys(this.state.eventTypes).map((event, i) =>{
                                return <FormControlLabel key={`${event}`}
                                    control={<Checkbox checked={this.state.eventTypes[event]} onChange={this.updateHandler(event)} name={`${event}`} />}
                                    label={`${event}`}
                                />
                        })}
                        </FormGroup>
                        <FormHelperText>Please only choose one</FormHelperText>
                    </FormControl>
                    <FormControl required error={!this.state.organizationError} component="fieldset" className="formControl">
                        <FormLabel component="legend">Pick one organization to add an event for  </FormLabel>
                        <FormGroup>
                        {
                            this.state.organizations.map((organization, i) =>{
                                const cur_name = this.state.organizations[i].name
                                console.log('cur_name!!', cur_name)
                                console.log(this.state.organizations[0].check);
                                
                                return <FormControlLabel key={`${organization} + ${i}`}
                                    control={<Checkbox checked={this.state.organizations[i].check} onChange={this.updateOrganizationHandler(event)} name={cur_name} />}
                                    label={cur_name}
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
                        key={this.state._image_key}
                        label="Max file size: 5mb, accepted: jpg, gif, png"
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
                            <CardWithButton event={event} buttonText="Delete" onClick={this.deleteEvent} ></CardWithButton>
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
