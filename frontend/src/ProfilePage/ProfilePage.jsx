import React from 'react';
import { connect } from 'react-redux';

class ProfilePage extends React.Component {
  
  render() {
      
      return (
          <div>
              ProfilePage
          </div>
      );
  }
}

const mapDispatchToProps = null;
const mapState = null;

const Profileconnected =  connect(mapState, mapDispatchToProps)(ProfilePage);
export { Profileconnected as ProfilePage};
