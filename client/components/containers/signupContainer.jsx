import React from 'react';
import { connect } from 'react-redux';
import SignupView from '../views/signup.jsx';
import store from '../../store.jsx';
import axios from 'axios';

class SignupContainer extends React.Component {
  constructor(props) {
    super(props);

    this.userSignup = this.userSignup.bind(this);
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
      axios.get('/user/details').then(res => {
      //   store.dispatch({
      //     type: 'USER_LIST_SUCCESS',
      //     users: response.data
      //   });
      });
      //dispatch to toggle login state
      //dispatch to change user state
      //reroute using context.router.push('/route')
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