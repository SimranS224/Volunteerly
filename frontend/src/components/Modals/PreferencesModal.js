import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import ScheduleSelector from 'react-schedule-selector'
import './PreferencesModal.css';
import {connect} from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {userService} from '../../_services/UserService'

import {userActions} from "../../_redux/_actions";

// schedule is a list of date objects for each hour that the user is available
// for: Example: [2012-08-01 12:00, 2012-08-01 13:00, 2012-08-01 14:00] This
// function converts it into a more readable form: with [day of week, start hour,
// end hour]  [monday, 12:00, 14:00]
// NOTE: only the day is considered because the schedule picker we use does not
// care about the specific date       but rather the day of the week
const defaultDateString = '2020-03-23'
const int2day = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
}

const day2int = {
    'Sunday': 0,
    'Monday': 1,
    'Tuesday': 2,
    'Wednesday': 3,
    'Thursday': 4,
    'Friday': 5,
    'Saturday': 6
}

function PreferencesModal(props) {

    const [state,
        setState] = React.useState({modalOpen: false, eventTypes: [], selectedDateString: null, schedule: []});
    // runs only when component first mounted due to second argument []
    React.useEffect(() => {
        async function setUp() {
            console.log("useEffect")
            // first get all of the available event types to display on the front end.
            const typeResults = await userService.getEventTypes()
            const eventTypes = []
            for (let i = 0; i < typeResults.event_type.length; i++) {
                let element = typeResults.event_type[i]
                eventTypes.push({type: element.text, set: false, id: element.id})
            };
            console.log("all event types are: ", eventTypes)
            let times_available = []
            // if logged in, then get custom preferences including event types and time
            // availability
            if (props.curUser) {
                console.log("user is: ", props.curUser.id)
                const preferences = await userService.getPreferences(props.curUser.id)
                // now iterate over all of the event type preferences, and check the ones that
                // are true for this user
                console.log("the preferences are: ", preferences)
                for (let i = 0; i < preferences.event_preference.length; i++) {
                    let element = preferences.event_preference[i]
                    let text = element.event_type.text
                    eventTypes.map(el => {
                        if (el.type === text) {
                            el.set = true
                        }
                    })
                }

                // now find all of the dates when user is available. will be displayed on the
                // date selector as the times the user specified they are available
                for (let i = 0; i < preferences.availability.length; i++) {
                    let element = preferences.availability[i]
                    let d = new Date(defaultDateString)
                    d.setDate(d.getDate() + day2int[element.day_of_week])
                    d.setHours(element.start_hour.substring(0, 2))
                    times_available.push(d)
                }

            }
            setState({
                ...state,
                eventTypes: eventTypes,
                schedule: times_available
            })
            console.log("eventTypes is: ", eventTypes)
            console.log("timesAvailable is: ", times_available)
            console.log("finished the setup")
        }
        setUp();

    }, []);

    // user checked/unchecked an event type, so update the list
    const updateHandler = name => event => {
        const eventTypesCopy = JSON.parse(JSON.stringify(state.eventTypes))
        for (let i = 0; i < eventTypesCopy.length; i++) {
            let element = eventTypesCopy[i]
            if (element.type === name) {
                element.set = event.target.checked
            }
        };

        setState({
            ...state,
            eventTypes: eventTypesCopy
        });
    };

    const openHandler = () => {
        setState({
            ...state,
            modalOpen: true
        });
    };

    const closeHandler = () => {
        setState({
            ...state,
            modalOpen: false
        });
    };

    const parseSchedule = (schedule) => {
        console.log("parseSchedule")
        if (schedule.length === 0) {
            return []
        }
        // first sort all of the preferences
        let availability = []
        console.log({schedule});
        
        for (let i = 0; i < schedule.length; i++) {
            
            const date = schedule[i]
            const weekDay = int2day[date.getDay()]
            const inthour = parseInt(date.toLocaleString('en-US', { hour: 'numeric', hour12: false }), 10);
            console.log({inthour});
            
            availability.push({
                day_of_week: weekDay,
                start_hour: inthour,
                end_hour: inthour + 1
            })
        }
        // console.log("the schedule is: ", schedule)
        console.log("the availabilities are: ", availability)
        return availability;
    }

    const saveCloseHandler = async () => {
        // first create the preference state we will be sending to Redux Store to update
        // the user preferences globally
        console.log("saving settings")
        const dateCopies = []
        for (let i = 0; i < state.schedule.length; i++) {
            dateCopies[i] = new Date(state.schedule[i].getTime())
        }
        const userEventTypes = []
        for (let i = 0; i < state.eventTypes.length; i++) {
            let element = state.eventTypes[i]
            if (element.set) {
                userEventTypes.push(element.type)
            }
        }
        console.log({dateCopies});
        
        const reduxPreferenceState = {
            event_preference: userEventTypes,
            selectedDate: state.selectedDate,
            availability: parseSchedule(dateCopies)
        }
        // Update all of the events to redux store, to be used globally
        console.log("reduxPreferenceState is:", reduxPreferenceState)
        props.setPreferences(reduxPreferenceState);

        // if logged in, upload the preferences to the preference database
        if (props.curUser) {
            console.log("volunteer is logged in")
            const eventPrefForDb = []
            // add volunteer_id to event_preference
            for (let i = 0; i < state.eventTypes.length; i++) {
                let element = state.eventTypes[i]
                if (element.set) {
                    eventPrefForDb.push({"volunteer_id": props.curUser.id, "event_type_id": element.id})
                }
            }

            const availabilityForDb = []
            // add volunteer_id to each availability
            reduxPreferenceState
                .availability
                .forEach(element => {
                    availabilityForDb.push({"volunteer_id": props.curUser.id, "day_of_week": element.day_of_week, "start_hour": element.start_hour, "end_hour": element.end_hour})
                })
            const prefForDb = {
                availability: availabilityForDb,
                event_preference: eventPrefForDb
            }
            console.log({prefForDb})
            const preferredEvents = await userService.updatePreferences(props.curUser.id, prefForDb)
            console.log({preferredEvents});
            props.updatePrefferedEvents(preferredEvents.newEvents);

            
        }
        // close the modal
        setState({
            ...state,
            modalOpen: false
        });
    }

    const handleDateChange = (date) => {
        setState({
            ...state,
            selectedDate: date
        });
    }

    const handleAvailabilityChange = (newSchedule) => {
        setState({
            ...state,
            schedule: newSchedule
        })
    }

    // const {eventTypes, selectedDate } = state;

    return  (
        <div className="preference">
            <Button variant="outlined" color="primary" onClick={openHandler}>
                Preferences
            </Button>
            <Dialog
                open={state.modalOpen}
                onClose={closeHandler}
                aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title">{"Choose what type of volunteer opportunities you would like to see"}</DialogTitle>
                <DialogContent>
                    <div className="root">
                        <FormControl required component="fieldset" className="formControl">
                            <FormLabel component="legend">Pick one</FormLabel>
                            <FormGroup>
                                <List>
                                    {state
                                        .eventTypes
                                        .map((event) => {
                                            return <ListItem key={event.type}><FormControlLabel
                                                control={< Checkbox checked = {
                                                event.set
                                            }
                                            onChange = {
                                                updateHandler(event.type)
                                            }
                                            value = {
                                                event.type
                                            } />}
                                                label={event.type}/></ListItem>
                                        })}
                                </List>
                            </FormGroup>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>

                                <ScheduleSelector
                                    selection={state.schedule}
                                    numDays={7}
                                    minTime={8}
                                    maxTime={24}
                                    dateFormat="ddd"
                                    startDate={new Date(defaultDateString)}
                                    onChange={handleAvailabilityChange}/>
                            </MuiPickersUtilsProvider>
                        </FormControl>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={closeHandler} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={saveCloseHandler} color="primary" autoFocus>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        setPreferences: (curUser, state) => {
            dispatch(userActions.setPreferences(curUser, state))
        },
        updatePrefferedEvents: (prefferedEvents) => {
          dispatch(userActions.updatePrefferedEvents(prefferedEvents))
        }
    }
}
const mapStateToProps = state => {
    return {curUser: state.userReducer.curUser}
}

const PreferencesModalconnected = connect(mapStateToProps, mapDispatchToProps)(PreferencesModal);
export {PreferencesModalconnected as PreferencesModal};