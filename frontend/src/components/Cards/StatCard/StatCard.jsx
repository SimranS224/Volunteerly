import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button'
import './StatCard.css';
import '../Card.css';

class StatCard extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
        return (
            <div className={"Card StatCard"}>
              <div className="icon"><img src={this.props.icon}></img></div>
              <div className="number">{this.props.number}</div>
              <div className="description">{this.props.text}</div>
            </div>
        );
  
    }
  }

export default StatCard;


