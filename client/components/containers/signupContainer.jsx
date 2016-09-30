import React from 'react';
import { connect } from 'react-redux';
import SignupView from '../views/signup.jsx';
import store from '../../store.jsx';
import axios from 'axios';
//import { Router } from 'react-router';

class SignupContainer extends React.Component {
  constructor(props) {
    super(props);

    this.userSignup = this.userSignup.bind(this);
  }

  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    };
  }

  userSignup(name, email, loc, pw) {
    var data = {
      'name': name,
      'email': email,
      'loc': loc,
      'pw': pw
    };
    console.log(data);

    axios.post('/signup', data).then(res => {
      console.log('res>>>>>', res.status);
      //on success - status 200
      axios.get('/user/details').then(res => {
      //   store.dispatch({
      //     type: 'USER_LIST_SUCCESS',
      //     users: response.data
      //   });
        store.dispatch({
          type: 'USER_AUTH',
          hasAuth: true
        });
        this.context.router.push('/home');
      });
      //dispatch to toggle login state
      //dispatch to change user state
      //reroute using context.router.push('/route')
    }).catch(err => {
      //on error - status 401

    });
    // store.dispatch({
    //   type: 'USER_AUTH',
    //   hasAuth: true
    // });
    // this.context.router.push('/home');
  }

  render() {
    return (
      <SignupView userSignup={this.userSignup} />
    );
  }

}

const mapStateToProps = function(store) {
  return {
    //users: store.userState.users
  };
};

export default connect(mapStateToProps)(SignupContainer);