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
import HouseIconGreen from './House-Icon-Green.svg';
import HouseIconPurple from './House-Icon-Purple.svg';
import badge1 from './badge1.png';
import badge2 from './badge2.png';
import badge3 from './badge3.png';

function createData(title, result, icon) {
    return { title, result, icon };
}


const categoryToText = {
    "hours": {
        part_1: "Volunteered for",
        part_2: 'Hours'
    },
    "organizations":{
        part_1: "Helped",
        part_2: 'Nonprofits'
    },
    "events":{
        part_1: "Participated in",
        part_2: "Events!"
    }
}


class ProfilePage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            loadedEnrolledEvents: false,
            enrolledEvents: [],
            attendedEvents: [],
            statistics:{numOrganizations:0,numEvents:0, numHours:0},
            achievements:[]
        }
    }
    componentDidMount(){
        // if user is logged in
        if(this.props.curUser){
            // get the user statistics
            userService.getUserStatistics(this.props.curUser.id).then(userStats => {
                console.log("user stats are: ", userStats)
                // first filter only the things you need, quantity and type of stats
                const stats = userStats.statistics.map(el => {
                    return {
                        category: el.stat_category.text,
                        quantity: el.quantity
                    }
                })
                const statistics = {
                    numOrganizations:stats.filter(el => el.category === "organizations")[0].quantity,
                    numEvents:stats.filter(el => el.category === "events")[0].quantity,
                    numHours:stats.filter(el => el.category === "hours")[0].quantity                  
                }
                this.setState({...this.state,statistics: statistics})
                console.log("user statistics are: ", statistics)
                console.log("finished setUp in ProfilePage")

            })
            // get the user achievements
            userService.getUserAchievements(this.props.curUser.id)
            .then(userAchievements => {

                const achievements = userAchievements.achievements.map(el => {
                    return {
                        category: el.achievement.statCategory.text,
                        quantity: el.achievement.quantity,
                        photo_url: el.achievement.photo_url
                    }
                })
                this.setState({...this.state,achievements: achievements})
                console.log("user achievements are: ", achievements)
            })

        }
        if(!this.state.loadedEnrolledEvents && this.props.curUser) {
            this.setState({loadedEnrolledEvents: true});
            userService.getEnrolledEvents(this.props.curUser.id).then((events) => {
                this.setState({
                    enrolledEvents: events.filter(event => {
                        return new Date(event.start_date) - new Date() >= 0
                    })
                })
            })
        }
        if(this.props.curUser) {
            userService.getAttendedEvents(this.props.curUser.id).then((events) => {
                console.log("attende events: ", events)
                this.setState({
                    attendedEvents: events
                })
            })
        }
    }

    render() {
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
                    <div className="col-md-4">
                                <StatCard icon={HouseIconPurple} number={this.state.statistics.numOrganizations} text={"Organizations volunteered at"}></StatCard>
                    </div>
                    <div className="col-md-4">
                                <StatCard icon={HouseIconGreen} number={this.state.statistics.numEvents} text={"Events volunteered at"}></StatCard>
                    </div>
                    <div className="col-md-4">
                                <StatCard icon={HouseIconPurple} number={this.state.statistics.numHours} text={"Hours spent volunteering"}></StatCard>
                    </div>
                </div>
                <h1 className="header">Achievements</h1>
                <div className="stat-row row">
                    {this.state.achievements.length > 0 && this.state.achievements.map((achievement, i) => {
                        return (
                            <div className="col-md-4" key={'achievement-' + i.toString()}>
                                <AchievementCard icon={achievement.photo_url} part_1={categoryToText[achievement.category].part_1}
                                 quantity={achievement.quantity} part_2={categoryToText[achievement.category].part_2}></AchievementCard>
                            </div>)
                    })}
                </div>

                <h1 className="header">Enrolled Events</h1>
                <div className="stat-row row">
                    <ul className="participated-events">
                        {this.state.enrolledEvents.map((event, i) => {
                            return (<li key={'event' + i.toString()}>
                                        <OppCard 
                                        date={event.start_date}
                                        title={event.name}
                                        description={event.description}
                                        />
                                    </li>)
                        })}
                    </ul>
                </div>

                <h1 className="header">Attended Events</h1>
                <div className="stat-row row">
                    <ul className="participated-events">
                        {this.state.attendedEvents.map((event, i) => {
                            return (<li key={'event' + i.toString()}>
                                        <OppCard 
                                        date={event.start_date}
                                        title={event.name}
                                        description={event.description}
                                        />
                                    </li>)
                        })}
                    </ul>
                </div>
                
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
