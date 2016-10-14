import React from 'react';
import { connect } from 'react-redux';
import SignupView from '../views/signup.jsx';
import axios from 'axios';
// import store from '../../store.jsx';
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
    axios.post('/signup', data).then(res => {
      //on success - status 200
      console.log('Signup Successful:', res.status);
      //get user details
      axios.get('/user/details').then(res => {
        console.log('Successfully retrieved user details:', res);

        //dispatch to toggle login state and fetch user details
        this.props.dispatch({
          type: 'USER_SIGNIN',
          name: res.data.full_name,
          email: res.data.email
        });
        //select home button upon login
        $('#homeNAV').removeClass('text').addClass('pop off');
        this.context.router.push('/home');
      }).catch(err => {
        console.error('Error getting user details:', err);
      });
    }).catch(err => {
      //on error - status 401
      console.error('Error signing up:', err);
    });
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