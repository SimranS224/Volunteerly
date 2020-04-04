import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

class OppCard extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
        return (
            <Card className="opp-card" onClick={this.props.onClick}>
                <CardContent className="opp-card-content">
                    <div className="date">
                        <div className="month">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][(new Date(this.props.date).getMonth())]}</div>
                        <div className="day"> {new Date(this.props.date).getDay() + 1}</div>
                    </div>
                    <div className="info">
                        <h3 >{this.props.title}</h3>
                        <p >{this.props.description}</p>
                    </div>
                </CardContent>
            </Card>
        );
  
    }
  }

export default OppCard;


