import React from 'react';
import { connect } from 'react-redux';
import {userService} from '../_services/UserService.js'
import CardList from '../components/General/CardList.jsx'

class ProfilePage extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        let pastEvents =  userService.getEvents('past');
        console.log('past events are: ', pastEvents);
        let futureEvents =  userService.getEvents('future');
        console.log('future events are: ', futureEvents);
      return (
          <div>
            <div>
                <h1>Future Events</h1>
            </div>
            <CardList elementList={futureEvents}></CardList>
            <div>
                <h1>Past Events</h1>
            </div>
            <CardList elementList={pastEvents}></CardList>
          </div>
        );
    }
}

const mapDispatchToProps = null;
const mapState = null;

const Profileconnected =  connect(mapState, mapDispatchToProps)(ProfilePage);
export { Profileconnected as ProfilePage};
