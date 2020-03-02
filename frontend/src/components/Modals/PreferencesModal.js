import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));


const dateuseStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));


export const PreferencesModal = () => {
  const classes = useStyles();
  const dateclasses = dateuseStyles();
  const [state, setState] = React.useState({
    openModal: false, 
    planting: false,
    cleanUp: false,
    communityBuilding: false,
  });

  
  const theme = useTheme();

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const handleClickOpen = () => {
    setState({ ...state, openModal: true });
  };

  const handleClose = () => {
    setState({ ...state, openModal: false });
  };

  const { planting, cleanUp, communityBuilding } = state;
  const error = [planting, cleanUp, communityBuilding].filter(v => v).length !== 2;


  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Preferences
      </Button>
      <Dialog
        open={state.openModal}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Choose what type of volunteer oppurtunities you would like to see"}</DialogTitle>
        <DialogContent>
        <div className={classes.root}>
            <FormControl required error={error} component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Pick two</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={cleanUp} onChange={handleChange('cleanUp')} value="Clean up" />}
                  label="Clean up"
                />
                <FormControlLabel
                  control={<Checkbox checked={communityBuilding} onChange={handleChange('communityBuilding')} value="communityBuilding" />}
                  label="Community building"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={planting} onChange={handleChange('planting')} value="planting" />
                  }
                  label="Planting"
                />
              </FormGroup>
              <form className={dateclasses.container} noValidate>
                <TextField
                  id="date"
                  label="Birthday"
                  type="date"
                  defaultValue="2017-05-24"
                  className={dateclasses.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </form>
              <FormHelperText>You can display an error</FormHelperText>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}