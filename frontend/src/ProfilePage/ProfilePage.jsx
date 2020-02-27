import React from 'react';
import { connect } from 'react-redux';
import {userService} from '../_services/UserService.js'
import CardList from '../components/General/CardList'
import UserStatistics from '../components/General/UserStatistics'
import './ProfilePage.css'

function createData(title, result) {
    return { title, result };
}

const statsRows = [
createData('Organizations you volunteered at', 5),
createData('Events you volunteered at', 10),
createData('Hours spent volunteering', 28),
];
const achievementRows = [
createData('Miles run for Terry Fox Marathon', 42),
createData('Pounds of Garbage collected at Lake Ontario', 6),
createData('Number of high school students tutored', 3),
];


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
          <div className="profile">
            <h1>User Statistics</h1>
            <UserStatistics rows={statsRows}></UserStatistics>
            <h1>Custom Achievements</h1>
            <UserStatistics rows={achievementRows}></UserStatistics>
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
