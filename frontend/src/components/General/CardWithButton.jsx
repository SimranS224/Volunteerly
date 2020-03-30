import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button'
import './Styling.css'
import hdate from 'human-date';
import QRCode from 'qrcode.react';

class CardWithButton extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
     
        return (
            <div className="container">
                <Card className="test">
                <CardHeader
                    title={this.props.event.name}
                    subheader={hdate.prettyPrint(this.props.event.start_date)}
                />
                <CardContent>
                    {this.props.event.description}
                </CardContent>
                <Button style={{marginBottom: "-20%"}} onClick={() => this.props.onClick(this.props.event)} variant="contained" color="primary">
                    {this.props.buttonText}
                </Button>
                <QRCode style={{float: "right"}} value="google.com"/>

                </Card>
            </div>
        );
  
    }
  }

export default CardWithButton;


