import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ImageGallery from 'react-image-gallery';
var hdate = require('human-date');

import "react-image-gallery/styles/css/image-gallery.css";
import CalIcon from './cal-icon.svg';
import LocIcon from './loc-icon.svg';

export class Event extends React.Component {
    constructor(props) {
        super(props)
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

    render() {
        console.log("event: ", this.props.event)
        return (
            <div className="Event">
                <ImageGallery items={this.transformImages(this.props.event.photo_url)}
                    showPlayButton={false}
                    showFullscreenButton={false}
                    showThumbnails={false}/>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <h1>{this.property(this.props.event, 'name')}</h1>
                        <div className="info">
                            <div className="container">
                                <div className="icon">
                                    <img src={CalIcon} />
                                </div>
                                <div className="text">
                                    <p>{this.property(this.props.event, 'start_date')}</p>
                                    <p>{this.property(this.props.event, 'start_time')}:00 - {this.property(this.props.event, 'end_time')}:00</p>
                                </div>
                            </div>
                            <div className="container">
                                <div className="icon">
                                    <img src={LocIcon} />
                                </div>
                                <div className="text">
                                    <p>{this.property(this.props.event, 'location')}</p>
                                    <p>Get directions</p>
                                </div>
                            </div>
                            <Button className="primary-button" variant="contained" onClick={() => this.props.enrollUser(this.props.event.id)} disableElevation>
                                Enroll
                             </Button>
                            <p className="description">
                                {this.property(this.props.event, 'description')}
                            </p>
                        </div>

                    </Grid>

                    <Grid item xs={4}>
                        <h1>hello</h1>
                    </Grid>
                </Grid>
                <h2> 
                </h2>

                <Typography className="event-title" variant="h2"> 
                {this.exists(this.props.event) ? this.props.event.name : null}
                </Typography>


                <Typography className="event-desc" variant="h4"> 
                    {this.exists(this.props.event) ? this.props.event.description : null}
                </Typography>

                <Typography className="event-date" variant="h4"> 
                    Starts {this.exists(this.props.Event) ? hdate.prettyPrint(this.props.event.start_date, { showTime: true }) : null} 
                    <br/>
                    Ends {this.exists(this.props.event) ? hdate.prettyPrint(this.props.event.end_date, { showTime: true }) : null} 
                    <br/>
                </Typography> 
            </div>
        )
    } 
}
 
export default Event