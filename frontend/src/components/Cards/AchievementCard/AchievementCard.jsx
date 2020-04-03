import React from 'react';
import './AchievementCard.css';

class AchievementCard extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
     
        return (
            <div className="Card AchievementCard">
              <div className="ach-card-container">
                <div className="icon"><img src={this.props.icon}></img></div>
                <div className="description">{this.props.part_1} </div>               
                <div className="number">{this.props.quantity}</div>               
                <div className="description">{this.props.part_2}</div>               
              </div>
            </div>
        );
  
    }
  }

export default AchievementCard;


