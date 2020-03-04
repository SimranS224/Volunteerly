import React from 'react';
import { connect } from 'react-redux';
import {userService} from '../_services/UserService.js'
import CardList from '../components/General/CardList'
import UserStatistics from '../components/General/UserStatistics'
import StatCard from '../components/Cards/StatCard/StatCard';
import AchievementCard from '../components/Cards/AchievementCard/AchievementCard';
import './ProfilePage.css'
import HouseIcon from './HouseCircle.svg';
import badge1 from './badge1.png';
import badge2 from './badge2.png';
import badge3 from './badge3.png';

function createData(title, result, icon) {
    return { title, result, icon };
}

const statsRows = [
createData('Organizations volunteered at', 5, HouseIcon),
createData('Events volunteered at', 10, HouseIcon),
createData('Hours spent volunteering', 28, HouseIcon),
];
const achievementRows = [
createData('Ran 10 miles for Terry Fox', undefined, badge1),
createData('Colleced 45 lbs of garbage from Lake Ontario', undefined, badge2),
createData('Tutored 10 high school students', undefined, badge3),
];


class ProfilePage extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        let pastEvents =  userService.getEvents('past');
        let futureEvents =  userService.getEvents('future');
      return (
          <div className="profile">
            <div className="profile-header">
                <div className="profile-header-container">
                    <div className="profile-picture"></div>
                    <div className="profile-info">
                        <h2>Wenqin Ye</h2>
                        <p>Joined February 2019</p>
                    </div>
                </div>
            </div>

            <div className="profile-stats">
                <h1 className="header">Stats</h1>
                <div className="stat-row row">
                    {statsRows.map((stat) => {
                        return (
                            <div className="col-md-4">
                                <StatCard icon={stat.icon} number={stat.result} text={stat.title}></StatCard>
                            </div>)
                    })}
                </div>
                <h1 className="header">Achievements</h1>
                <div className="stat-row row">
                    {achievementRows.map((achievement) => {
                        return (
                            <div className="col-md-4">
                                <AchievementCard icon={achievement.icon} text={achievement.title}></AchievementCard>
                            </div>)
                    })}
                </div>

                {/* <UserStatistics rows={achievementRows}></UserStatistics>
                <div>
                    <h1>Future Events</h1>
                </div>
                <CardList elementList={futureEvents}></CardList>
                <div>
                    <h1>Past Events</h1>
                </div>
                <CardList elementList={pastEvents}></CardList> */}
            </div>
          </div>
        );
    }
}

const mapDispatchToProps = null;
const mapState = null;

const Profileconnected =  connect(mapState, mapDispatchToProps)(ProfilePage);
export { Profileconnected as ProfilePage};
