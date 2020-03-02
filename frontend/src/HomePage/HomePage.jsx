import React from 'react';
import { connect } from 'react-redux';
<<<<<<< HEAD

=======
>>>>>>> 46f9e0c1f883993d0bdae34eecc74021aff15969
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {userService} from '../_services/UserService.js'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';
import DialogContent from '@material-ui/core/DialogContent';
import MapContainer from '../components/Maps/MapContainer'


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
class HomePage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      data: [],
      dialog_open: false,
      filtered: [],
      selected: null
    }
  }
   componentDidMount() {
    let events =  userService.getEvents(null);
    console.log("events", events)
    this.setState({data: events, filtered: events})
  }
  handleSearch = (e) =>{
    e = e.target.value
    let filtered = this.state.data.filter(event => {
      let keys = Object.keys(event)
      for(let i = 0; i < keys.length; i++){
        if(event[keys[i]].toLowerCase().indexOf(e.toLowerCase()) > -1){
          console.log("found")
          return true
        }
      }
      return false
    })
    this.setState({filtered: filtered})
  } 
  render() {
     let { filtered } = this.state

      return (
          <div>
              <h1>Current Available Opportunities</h1>
              <div style={{width: "500px"}}>
            <input style={{
  width: "300px",
  borderRadius: "5px",
  height: "40px",
  border: "1px solid black",
  margin: "20px"
}} ref="query" placeholder=" Search" type="text" onChange={this.handleSearch}/>
          </div>
              <List>
              {filtered.length > 0 && filtered.map((event, i) =>{
               return <ListItem key={'event' + i.toString()}>
                <Card style={{width: "80%"}} onClick={() =>{this.setState({dialog_open: true, selected: i})}}>
      <CardHeader
        title={event.title}
        subheader={event.date}
      />

      <CardContent>
      {event.desc}
      </CardContent>
      </Card>
      <Dialog fullScreen open={this.state.dialog_open} onClose={() =>{this.setState({dialog_open: false, selected: null})}} TransitionComponent={Transition}>
      <AppBar >
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={() =>{this.setState({dialog_open: false, selected: null})}} aria-label="close">
              <CloseIcon />
            </IconButton>
            </Toolbar>
        </AppBar>

        <DialogContent>
        <Typography  style={{paddingTop: "10vh", fontSize: "30px"}}> 
        {this.state.selected !== null ? filtered[this.state.selected].title : null}
        </Typography>
        <Button variant="contained" color="primary" disableElevation>
      Enroll
    </Button>
        <Typography  style={{paddingTop: "1vh", fontSize: "25px"}}> 
        Description
        </Typography>
        <Typography style={{ paddingTop: "5vh", fontSize: "20px"}}> 
        {this.state.selected !== null ? filtered[this.state.selected].desc : null}
        </Typography>
        <Typography style={{ paddingTop: "2vh", fontSize: "20px"}}> 
        Event date: {this.state.selected !== null ? filtered[this.state.selected].date : null} 
        <br/>
        Event start time: 1pm
        <br/>
        Location:
        </Typography>
        <MapContainer selectedPlace={filtered[this.state.selected]}/>
        
        </DialogContent>
      </Dialog>
                </ListItem>
              })}
              </List>
          </div>
      );
  }
}

const mapDispatchToProps = null;
const mapState = null;

const Homeconnected =  connect(mapState, mapDispatchToProps)(HomePage);
export { Homeconnected as HomePage};
