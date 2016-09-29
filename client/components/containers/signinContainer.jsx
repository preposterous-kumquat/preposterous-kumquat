import React from 'react';
import { connect } from 'react-redux';
import SigninView from '../views/signin.jsx';
import store from '../../store.jsx';
import axios from 'axios';

import { Navigation } from 'react-router';

class SigninContainer extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   username: ''
    // };
    this.userSignin = this.userSignin.bind(this);

  }


  userSignin(email, pw) {
    var data = {
      'email': email,
      'pw': pw
    };
    console.log(data);

    axios.post('/login', data).then(res => {
      axios.get('/user/details').then(res => {
      //   store.dispatch({
      //     type: 'USER_LIST_SUCCESS',
      //     users: response.data
      //   });
        // this.context.router.push('/home');
      });
      //dispatch to toggle login state
      //dispatch to change user state
      //reroute using context.router.push('/route')
    });

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