import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button'
import './Styling.css'
import hdate from 'human-date';
import QRCode from 'qrcode.react';
import CryptoJS from 'crypto-js';
const iv  = CryptoJS.enc.Hex.parse('be410fea41df7162a679875ec131cf2c');

class CardWithButton extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
    //  console.log("window loc",window.location.origin )
     console.log("encrypt",CryptoJS.AES.encrypt(this.props.event.id.toString(),'secretKey',{
                                                                                            iv: iv,
                                                                                            mode: CryptoJS.mode.CBC,
                                                                                            padding: CryptoJS.pad.Pkcs7
                                                                                          }).toString())
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
                <QRCode className="QR" value={window.location.origin + "/event_login/" + CryptoJS.AES.encrypt(this.props.event.id.toString(),'secretKey',{
                                                                                                                            iv: iv,
                                                                                                                            mode: CryptoJS.mode.CBC,
                                                                                                                            padding: CryptoJS.pad.Pkcs7
                                                                                                                          }).toString()}/>

                </Card>
            </div>
        );
  
    }
  }

export default CardWithButton;


