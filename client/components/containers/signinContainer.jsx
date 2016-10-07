import React from 'react';
import { connect } from 'react-redux';
import SigninView from '../views/signin.jsx';
import store from '../../store.jsx';
import axios from 'axios';
//import { Router } from 'react-router';


class SigninContainer extends React.Component {
  constructor(props) {
    super(props);

    //method bindings
    this.userSignin = this.userSignin.bind(this);
    this.getUserPhotos = this.getUserPhotos.bind(this);
  }

  //for context router to work
  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    };
  }

  getUserPhotos() {
    axios.get('/photos').then(res => {

    }).catch(err => {
      console.log(error);
    });
  }

  userSignin(email, pw) {
    var data = {
      'email': email,
      'pw': pw
    };
    axios.post('/login', data).then(res => {
      console.log('Signin Successful:', res.status);
      //on success - status 200
      if (res.status === 200) {
        axios.get('/user/details').then(res => {
          console.log('Successfully retrieved user details:', res);
          //dispatch to toggle login state
          store.dispatch({
            type: 'USER_AUTH',
            hasAuth: true
          });
          //dispatch to update user details
          store.dispatch({
            type: 'USER_NAME',
            userName: res.data.full_name
          });
          store.dispatch({
            type: 'USER_EMAIL',
            userName: res.data.email
          });

          this.context.router.push('/home');
        }).catch(err => {
          console.error('Error getting user details:', err);
        });
      }
    }).catch(err => {
      //on error - status 401
      console.error('Error signing in:', err);
    });
  }

  render() {
    return (
      <SigninView userSignin={this.userSignin} />
    );
  }

}

const mapStateToProps = function(store) {
  return {
    // userName: store.userState.userName
  };
};

export default connect(mapStateToProps)(SigninContainer);

// axios.post('/save', { firstName: 'Marlon', lastName: 'Bernardes' })
//   .then(function(response){
//     console.log('saved successfully')
//   });