import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { FormControl } from '@material-ui/core';
import { userActions } from "../_redux/_actions";
import './RegisterPage.css'
import ImageUploader from "react-images-upload";
import store from 'store'
import { userService } from '../_services';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        pictures: []
    };
  }

  register = async (first_name, last_name, email, password) =>{
    
    const res = await userService.registerUser(first_name, last_name, email, password, this.state.pictures)
    console.log("register res", res)
    this.props.register(res.body.statusCode)
    if(res.body.statusCode === 200){
      toast('Login success!', {
      position: "top-right"
      autoClose: 5000
      hideProgressBar: false
      closeOnClick: true
      pauseOnHover: true
      draggable: true
      });
    }
    this.props.login(res.body.id, res.body.statusCode, res.body.email, res.body.token, res.body.level, first_name, last_name, res.photo_url)


  }
onDrop = (pictureFiles) =>{
        console.log(pictureFiles)
        this.setState({
            pictures: this.state.pictures.concat(pictureFiles)
        });
    }
  render() {
    return (
      <div className="container">
        <div className="login">
        <h3>Register </h3>
          <FormControl className="form">
           <TextField id="first_name"  required placeholder="First Name" variant="outlined" onChange={(e)=> {this.setState({'first_name': e.target.value})}}/>
           <TextField id="last_name"  required placeholder="Last Name" variant="outlined" onChange={(e)=> {this.setState({'last_name': e.target.value})}}/>

            <TextField id="email"  required placeholder="Email" variant="outlined" onChange={(e)=> {this.setState({'email': e.target.value})}}/>
            <TextField id="password" required type="Password" onChange={(e)=> {this.setState({'password': e.target.value})}} autoComplete="current-password" required placeholder="password" variant="outlined" />
            <ImageUploader
                            withIcon={true}
                            withPreview={true}
                            buttonText="Choose a profile picture!"
                            onChange={this.onDrop.bind(this)}
                            imgExtension={[".jpg", ".gif", ".png", ".jpeg", ".JPG", ".GIF", ".PNG", ".JPEG"]}
                            maxFileSize={5242880}
                          />
            <Button variant="contained" color="primary"  value="Submit" onClick={() => {
              this.register(this.state.first_name, this.state.last_name, this.state.email, this.state.password)
            }}>
                Register
            </Button>
          </FormControl>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    register: (statusCode) => {
      dispatch(userActions.register(statusCode))
    },
    login: (id, statusCode, email, token, level, first_name, last_name, profile_picture_url) => {
      dispatch(userActions.login(id, statusCode, email, token, level, first_name, last_name, profile_picture_url))
    }
  } 
}

const mapStateToProps = null

const Registerconnected =  connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
export { Registerconnected as RegisterPage};