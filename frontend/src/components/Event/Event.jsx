import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ImageGallery from 'react-image-gallery';
import MapContainer from '../Maps/MapContainer';
var hdate = require('human-date');

import "react-image-gallery/styles/css/image-gallery.css";
import CalIcon from './cal-icon.svg';
import LocIcon from './loc-icon.svg';
import Smiling from './smiling.png';

import './Event.css';

export class Event extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            disableEnrollmentButton: false
        }
    }

    transformImages(imageUrls) {
        if (!this.exists(imageUrls)) {
            return []
        }
        console.log(imageUrls)
        const urls = imageUrls.split(" ")
        let images = []
        for(let i = 0; i < urls.length; i++) {
            images.push({
                original: urls[i]
            })
        }
        return images
    }

    exists(variable) {
        return variable !== null && variable !== undefined
    }

    property(variable, name) {
        console.log(variable, name)
        if(!this.exists(variable)) {
            return null
        } else {
            return variable[name]
        }
    }

    hourAsTimeStr(hour) {
        if(hour == 12) {
            return `12:00 PM`
        } else if (hour < 12) {
            return `${hour}:00 AM`
        } else {
            return `${hour-12}:00 PM`
        }
    }

    handleEnrollClick() {
        this.setState({
            disableEnrollmentButton: true
        })
        this.props.enrollUser(this.props.event, this.props.curUser)
    }

    render() {
        console.log("event: ", this.props.event)
        return (
            <div className="Event">
                <ImageGallery items={this.transformImages(this.props.event.photo_url)}
                    showPlayButton={false}
                    showFullscreenButton={false}
                    showThumbnails={false}/>
                <Grid container spacing={4}>
                    <Grid item md={1}></Grid>
                    <Grid item md={6}>
                        <h1>{this.property(this.props.event, 'name')}</h1>
                        <div className="info">
                            <p className="subheading">Time and Location</p>
                            <div className="info-container">
                                <div className="icon">
                                    <img src={CalIcon} />
                                </div>
                                <div className="text">
                                    <p>{hdate.prettyPrint(this.property(this.props.event, 'start_date'))}</p>
                                    <p>{`${this.hourAsTimeStr(this.property(this.props.event, 'start_time'))} - 
                                     ${this.hourAsTimeStr(this.property(this.props.event, 'end_time'))}`}</p>
                                </div>
                            </div>
                            <div className="info-container">
                                <div className="icon">
                                    <img src={LocIcon} />
                                </div>
                                <div className="text">
                                    <p>{this.property(this.props.event, 'location')}</p>
                                    <p><a target="__blank" href={`https://www.google.com/maps/place/${this.props.event.location}`}>Get directions</a></p>
                                </div>
                            </div>
                            <Button className="primary-button" variant="contained" onClick={() => this.handleEnrollClick()} 
                                disabled={this.state.disableEnrollmentButton}
                                disableElevation>
                                Enroll
                             </Button>
                             

                            <div className="description">
                                <p className="subheading">Event Details</p>
                                <p className="text">{this.property(this.props.event, 'description')}</p>
                            </div>
                        </div>
                    </Grid>

                    <Grid item md={4} xs={12}>
                        <div className="host-organization">

                            <img className="organizationLogo" src={this.props.event.organization.organization_logo_url}></img>
                            <p className="organizationName">{this.props.event.organization.organization_name}</p>
                            <p className="bio">{this.props.event.organization.bio}</p>
                        </div>
                    </Grid>
                </Grid>
            
                <div className="why-volunteer">
                    <Grid md={1} ></Grid>
                    <img src={Smiling}></img>
                    <div className="info">
                        <h3 className="subheading">Why Volunteer?</h3>
                        <Grid md={6} xs={12}>
                        <p className="subtext">“I absolutely love volunteering. Through volunteering at the United way 
                        and other organizations I made many new friends and also felt good about helping out in my community.
                        I encourage everybody to volunteer about a cause they are passionate about, you will be rewarded
                        many times over for your efforts.”
                            - Jenny Liu (Voluneerly user)  </p>
                        </Grid>
                    </div>
                </div>
            </div>
        )
    } 
}
 
export default Event