import React from 'react';
import { connect } from 'react-redux';
import SigninView from '../views/signin.jsx';
import store from '../../store.jsx';
import axios from 'axios';
//import { Router } from 'react-router';


class SigninContainer extends React.Component {
  constructor(props) {
    super(props);
    this.userSignin = this.userSignin.bind(this);

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
      console.log('res.status>>>>>', res.status);
      if (res.status === 200) {
        axios.get('/user/details').then(res => {
        //dispatch to change user state
        // store.dispatch({
        //   type: 'USER_LIST_SUCCESS',
        //   users: response.data
        // });
        // this.context.router.push('/home');
          store.dispatch({
            type: 'USER_AUTH',
            hasAuth: true
          });
          this.context.router.push('/home');
        });
      }
      
    });
    // store.dispatch({
    //   type: 'USER_AUTH',
    //   hasAuth: true
    // });
    // this.context.router.push('/home');
  }

  render() {
    return (
      <SigninView userSignin={this.userSignin} />
    );
  }

}

const mapStateToProps = function(store) {
  return {
    //users: store.userState.users
  };
};

export default connect(mapStateToProps)(SigninContainer);

// axios.post('/save', { firstName: 'Marlon', lastName: 'Bernardes' })
//   .then(function(response){
//     console.log('saved successfully')
//   });