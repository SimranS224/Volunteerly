import React from 'react';
import './AchievementCard.css';

class AchievementCard extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
     
        return (
            <div className="Card AchivementCard">
              <div className="ach-card-container">
                <div className="icon"><img src={this.props.icon}></img></div>
                <div className="description">{this.props.text}</div>
              </div>
            </div>
        );
  
    }
  }

export default AchievementCard;


