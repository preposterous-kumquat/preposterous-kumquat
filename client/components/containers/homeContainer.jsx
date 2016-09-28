import React from 'react';
import { connect } from 'react-redux';
import HomeView from '../views/home.jsx';
import store from '../../store.jsx';

class HomeContainer extends React.Component {
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
      <HomeView users={this.props.users} />
    );
  }

}

const mapStateToProps = function(store) {
  return {
    //users: store.userState.users
  };
};

export default connect(mapStateToProps)(HomeContainer);