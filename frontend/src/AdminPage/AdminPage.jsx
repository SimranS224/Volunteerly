import React from 'react';
import { connect } from 'react-redux';
import { Divider } from '@material-ui/core';


class AdminPage extends React.Component {

  render() {
      return (
          <div>
              AdminPage
              <Divider />
          </div>
      );
  }
}

const mapDispatchToProps = null;
const mapState = null;

const adminConnected = connect(mapState, mapDispatchToProps)(AdminPage)
export { adminConnected as AdminPage };
