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
import {
  MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import ScheduleSelector from 'react-schedule-selector'
import './PreferencesModal.css';
import { connect } from 'react-redux';

import { userActions } from "../../_redux/_actions";

// schedule is a list of date objects for each hour that 
// the user is available for: Example: [2012-08-01 12:00, 2012-08-01 13:00, 2012-08-01 14:00]
// This function converts it into a more readable form: with [day of week, start hour, end hour] 
//  [monday, 12:00, 14:00]
// NOTE: only the day is considered because the schedule picker we use does not care about the specific date
//       but rather the day of the week
const parseSchedule = (schedule) => {
  const int2day = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
  }
  if(schedule.length === 0) {
    return []
  }

  let ranges = []
  let currentDay = int2day[schedule[0].getDay()]
  let startHour = schedule[0].getHours()
  let endHour = schedule[0].getHours()
  for(let i = 1; i < schedule.length; i++) {
    const date = schedule[i]
    const day = int2day[date.getDay()]
    const hour = date.getHours()

    // new day range to process so restart 
    if(currentDay !== null && (currentDay != day || endHour + 1 !== hour)) {
      ranges.push([currentDay, startHour, endHour])
      currentDay = day;
      startHour = hour;
      endHour = hour;
    } 
    endHour = hour;
  }
  ranges.push([currentDay, startHour, endHour]);
  return ranges;
}

const PreferencesModal = ({ setPreferences }) => {

  const [state, setState] = React.useState({
    modalOpen: false, 
    planting: false,
    cleanUp: false,
    communityBuilding: false,
    selectedDateString: null,
    schedule: []
  });

  const updateHandler = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const openHandler = () => {
    setState({ ...state, modalOpen: true });
  };

  const closeHandler = () => {
    setState({ ...state, modalOpen: false });
  };

  const saveCloseHandler = () => {
    const preferenceState = { 
      planting: state.planting, 
      cleanUp: state.cleanUp, 
      communityBuilding: state.communityBuilding,
      selectedDate: state.selectedDate,
      availability: parseSchedule(state.schedule)
    }
    
    setPreferences(preferenceState);
    setState({ ...state, modalOpen: false });
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

  const { planting, cleanUp, communityBuilding, selectedDate } = state;
  const error = [planting, cleanUp, communityBuilding].filter(v => v).length !== 1;

  return (
    <div className="preference">
      <Button variant="outlined" color="primary" onClick={openHandler}>
        Preferences
      </Button>
      <Dialog
        open={state.modalOpen}
        onClose={closeHandler}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Choose what type of volunteer oppurtunities you would like to see"}</DialogTitle>
        <DialogContent>
        <div className="root">
            <FormControl required error={error} component="fieldset" className="formControl">
              <FormLabel component="legend">Pick one</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={cleanUp} onChange={updateHandler('cleanUp')} value="Clean up" />}
                  label="Clean up"
                />
                <FormControlLabel
                  control={<Checkbox checked={communityBuilding} onChange={updateHandler('communityBuilding')} value="communityBuilding" />}
                  label="Community building"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={planting} onChange={updateHandler('planting')} value="planting" />
                  }
                  label="Planting"
                />
              </FormGroup>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>

              <ScheduleSelector
                selection={state.schedule}
                numDays={7}
                minTime={8}
                maxTime={24}
                dateFormat="ddd"
                startDate={new Date('2020-03-24')}
                onChange={handleAvailabilityChange}
              />
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
    }
  } 
}
const mapStateToProps = null;

const PreferencesModalconnected =  connect(mapStateToProps, mapDispatchToProps)(PreferencesModal);
export { PreferencesModalconnected as PreferencesModal};