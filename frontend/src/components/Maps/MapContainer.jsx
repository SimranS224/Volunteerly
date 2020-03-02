import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
 import React from 'react';

export class MapContainer extends React.Component {
  render() {
    return (
      <Map containerStyle={{  
  width: '50%',
  height: '50%'
}} google={this.props.google} zoom={14}>
 
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
 
        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>{this.props.selectedPlace !== undefined ? this.props.selectedPlace.title : null}</h1>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ("AIzaSyD3yTG_YQ5dr1JQ3clhPWqfKEUWBYI4T8Q")
})(MapContainer)