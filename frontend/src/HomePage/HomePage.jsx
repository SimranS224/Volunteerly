import React from 'react';
import { connect } from 'react-redux';

class HomePage extends React.Component {
  
  render() {
      
      return (
          <div>
              Homepage
          </div>
      );
  }
}

const mapDispatchToProps = null;
const mapState = null;

const Homeconnected =  connect(mapState, mapDispatchToProps)(HomePage);
export { Homeconnected as HomePage};
