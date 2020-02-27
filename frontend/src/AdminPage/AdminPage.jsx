import React from 'react';
import { connect } from 'react-redux';
import { Divider } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

import './AdminPage.css';

class AdminPage extends React.Component {

  render() {
      return (
          <div className="AdminPage">
              <h2>Add Event</h2>
              <Divider />
              <div className="AddEvent">
                <form noValidate autoComplete="off">
                    <div className="group">
                        <TextField id="standard-basic" label="Event Name" />
                    </div>
                    <div className="group">
                        <TextField id="standard-basic" label="Description" multiline={true} rows={5} />
                    </div>
                    <div className="group">
                        <TextField id="standard-basic" type="date" label="Date" defaultValue="2019-05-24" />
                    </div>
                    <div className="group">
                        <Button variant="contained" color="primary">
                            Add event
                        </Button>
                    </div>
                </form>

                <h2>Manage Events</h2>
                <Divider />
                <Card>
                    <h4>Trash Cleanup at High Park</h4>
                    <p>Monday May 5th, 2020</p>
                    <Button variant="contained">
                            Delete
                    </Button>
                </Card>
                <Card>
                    <h4>Trinity park cleanup</h4>
                    <p>Monday May 12th, 2020</p>
                    <Button variant="contained">
                            Delete
                    </Button>
                </Card>
                <Card>
                    <h4>Jose park cleanup</h4>
                    <p>Monday May 18th, 2020</p>
                    <Button variant="contained">
                            Delete
                    </Button>
                </Card>
              </div>
          </div>
      );
  }
}

const mapDispatchToProps = null;
const mapState = null;

const adminConnected = connect(mapState, mapDispatchToProps)(AdminPage)
export { adminConnected as AdminPage };
