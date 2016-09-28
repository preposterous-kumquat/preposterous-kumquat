import React from 'react';
import { connect } from 'react-redux';
import SigninView from '../views/signin.jsx';
import store from '../../store.jsx';

class SigninContainer extends React.Component {
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
      <SigninView users={this.props.users} />
    );
  }

}

const mapStateToProps = function(store) {
  return {
    //users: store.userState.users
  };
};

export default connect(mapStateToProps)(SigninContainer);