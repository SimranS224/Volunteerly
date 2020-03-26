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

class AdminPage extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
            data: [],
            eventTitle: '',
            eventDescription: '',
            startDate:'2019-05-24',
            endDate: '2019-05-24',
            startTime: "Thu Mar 26 2020 23:57:51 GMT-0400 (Eastern Daylight Time)",
            endTime: "Thu Mar 26 2020 23:58:51 GMT-0400 (Eastern Daylight Time)",
            pictures: []
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
    }

    addEvent = async () => {
        // this.setState({
        //     showEventAddSuccess: true,
        //     eventTitle: "",
        //     eventDescription: "",
        //     eventDate: '2019-05-24',
        //     pictures: []
        // });

        // {"id":10,"name":"Ronstring","start_date":"2/25/2020","end_date":"2/25/2020", "description":"","location":"Huaqiao","event_category_id":"9","photo_url":"http://dummyimage.com/247x163.png/dddddd/000000","organization_id":"4","duration":5}]
        // try { 
        //     await userService.addEvent(event, this.props.curUser);
        //     this.props.addEvent({, title: this.state.eventTitle, desc: this.state.eventDescription, type:'Clean Up', date:this.state.eventDate, pictures: this.state.pictures})

        // } catch (err) {
        //     console.log(`Error adding event: ${err}`)
        // }
        // console.log(this.props.curUser)

        // console.log({curUser})
        this.props.addEvent({user: this.props.curUser.user, title: this.state.eventTitle, desc: this.state.eventDescription, type:'Clean Up', date:this.state.eventDate, pictures: this.state.pictures})
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

    startDateChange(e){
        console.log(e.target.value);
        this.setState({startDate: e.target.value});
    }  
    
    endDateChange(e){
        console.log(e.target.value);
        this.setState({endDate: e.target.value});
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
        console.log(pictureFiles)
        this.setState({
            pictures: this.state.pictures.concat(pictureFiles)
        });
    }

    handleClose() {
        this.setState({showEventAddSuccess: false});
    }


  render() {
    console.log("data", this.state.data)
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
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>

                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Start Date"
                            value={this.state.startDate}
                            onChange={this.startDateChange.bind(this)}
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
                            onChange={this.endDateChange.bind(this)}
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
