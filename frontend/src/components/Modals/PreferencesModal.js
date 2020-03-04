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
import './PreferencesModal.css';
import { connect } from 'react-redux';

import { userActions } from "../../_redux/_actions";

const PreferencesModal = ({ setPreferences }) => {

  const [state, setState] = React.useState({
    modalOpen: false, 
    planting: false,
    cleanUp: false,
    communityBuilding: false,
    selectedDate: null,
    selectedDateString: null
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
      selectedDate: state.selectedDate
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
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Choose a date"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
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