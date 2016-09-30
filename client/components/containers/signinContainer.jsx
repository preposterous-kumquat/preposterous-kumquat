import React from 'react';
import { connect } from 'react-redux';
import SigninView from '../views/signin.jsx';
import store from '../../store.jsx';
import axios from 'axios';
import { Router } from 'react-router';


class SigninContainer extends React.Component {
  constructor(props) {
    super(props);
    this.userSignin = this.userSignin.bind(this);

  }

  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    };
  }

  userSignin(email, pw) {
    var data = {
      'email': email,
      'pw': pw
    };
    console.log(data);

    axios.post('/login', data).then(res => {
      axios.get('/user/details').then(res => {
        //dispatch to toggle login state
        // store.dispatch({
        //   type: 'USER_AUTH',
        //   hasAuth: true
        // });
        //dispatch to change user state
        // store.dispatch({
        //   type: 'USER_LIST_SUCCESS',
        //   users: response.data
        // });
        // this.context.router.push('/home');
      });
      //reroute using context.router.push('/route')
    });
    store.dispatch({
      type: 'USER_AUTH',
      hasAuth: true
    });
    this.context.router.push('/home');
  }

  render() {
    return (
      <SigninView userSignin={this.userSignin} />
    );
  }

}

// SigninContainer.contextTypes = {
//   router: PropTypes.object.isRequired
// };

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