import React from 'react';
import { connect } from 'react-redux';
import SignupView from '../views/signup.jsx';
import store from '../../store.jsx';

class SignupContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //
    };
  }
  // componentDidMount() {
  //   userApi.getUsers();
  //   store.dispatch(loadSearchLayout('users', 'User Results'));
  // }
  render() {
    return (
      <SignupView users={this.props.users} />
    );
  }

}

const mapStateToProps = function(store) {
  return {
    //users: store.userState.users
  };
};

export default connect(mapStateToProps)(SignupContainer);