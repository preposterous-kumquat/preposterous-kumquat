import React from 'react';
import { connect } from 'react-redux';
import MainLayout from './layouts/mainlayout.jsx';
import LandingLayout from './layouts/landinglayout.jsx';
import store from '../store.jsx';

class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   //
    // };
  }
  // componentDidMount() {
  //   userApi.getUsers();
  //   store.dispatch(loadSearchLayout('users', 'User Results'));
  // }
  // render() {
  //   return (
  //     <div>
  //       {this.props.hasAuth ? <MainLayout /> : <LandingLayout />}
  //     </div>
  //   );

  render() {
    return (
      <div>
        <LandingLayout { ...this.props } />
      </div>
    );
  }

  // // }
  // render() {
  //   return (
  //     <div>
  //       <MainLayout { ...this.props } />
  //     </div>
  //   );
  // }

}

const mapStateToProps = function(store) {
  return {
    //users: store.userState.users
  };
};

export default connect(mapStateToProps)(MainContainer);