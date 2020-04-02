import React from 'react';
import { connect } from 'react-redux';
import {userService } from '../_services/UserService.js'
import { eventService } from '../_services/EventsService.js'
import { userActions } from "../_redux/_actions";
import CardList from '../components/General/CardList'
import UserStatistics from '../components/General/UserStatistics'
import StatCard from '../components/Cards/StatCard/StatCard';
import AchievementCard from '../components/Cards/AchievementCard/AchievementCard';
import OppCard from '../components/OppCard/OppCard';
import './ProfilePage.css'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
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
        this.state = {
            loadedEnrolledEvents: false,
            enrolledEvents: []
        }
    }

    render() {
        if(!this.state.loadedEnrolledEvents) {
            this.setState({loadedEnrolledEvents: true});
            userService.getEnrolledEvents(this.props.curUser.id).then((events) => {
                console.log("setting events: ", events);
                this.setState({
                    enrolledEvents: events
                })
            })
        }

        let pastEvents =  eventService.getEvents('past');
        let futureEvents =  eventService.getEvents('future');
      return (
          <div className="profile">
            <div className="profile-header">
                <div className="profile-header-container">
                    <div className="profile-picture">{this.props.curUser.profile_picture_url !== undefined && this.props.curUser.profile_picture_url !== null && this.props.curUser.profile_picture_url !== "" ? <img src={this.props.curUser.profile_picture_url} alt="profile pic" width="100%"></img> : null}</div>
                    <div className="profile-info">
                        <h2>{this.props.curUser.first_name + " " + this.props.curUser.last_name}</h2>
                        <p>Joined February 2019</p>
                    </div>
                </div>
            </div>

            <div className="profile-stats">
                <h1 className="header">Stats</h1>
                <div className="stat-row row">
                    {statsRows.map((stat, i) => {
                        return (
                            <div className="col-md-4" key={'stats-' + i.toString()}>
                                <StatCard icon={stat.icon} number={stat.result} text={stat.title}></StatCard>
                            </div>)
                    })}
                </div>
                <h1 className="header">Achievements</h1>
                <div className="stat-row row">
                    {achievementRows.map((achievement, i) => {
                        return (
                            <div className="col-md-4" key={'achievement-' + i.toString()}>
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

                {/* <div>
                    <h1>Events {this.props.curUser.first_name} has enrolled in</h1>
                </div>
                <List>
                    {this.state.enrolledEvents.map((event, i) => {
                        return (<ListItem key={'event' + i.toString()}>
                                    <OppCard 
                                    date={event.start_date}
                                    title={event.name}
                                    description={event.description}
                                    />
                                </ListItem>)
                    })}
                </List> */}
            </div>
          </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
      setEnrolledEvents: (enrolledEvents) => {
        dispatch(userActions.setEnrolledEvents(enrolledEvents));
      }
    } 
}

const mapStateToProps = state => {
  return {
    curUser: state.userReducer.curUser
  }
}

const Profileconnected =  connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
export { Profileconnected as ProfilePage};
