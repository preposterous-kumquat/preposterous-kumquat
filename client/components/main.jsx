import React from 'react';
import { connect } from 'react-redux';
import MainLayout from './layouts/mainlayout.jsx';
import LandingLayout from './layouts/landinglayout.jsx';
import store from '../store.jsx';

class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    // why doesn't this syntax work???
    // var { hasAuth } = this.props;
    // console.log(hasAuth);
    //console.log("store.userState.isLoggedIn", store.userState.isLoggedIn);
    this.userSignout = this.userSignout.bind(this);
  }
  userSignout() {
    this.props.dispatch({
      type: 'USER_AUTH',
      hasAuth: false
    });
  }
  // componentDidMount() {
  //   console.log(this.props.hasAuth);
  // }
  // componentDidMount() {
  //   userApi.getUsers();
  //   store.dispatch(loadSearchLayout('users', 'User Results'));
  // }
  render() {
    return (
      <div>
        {this.props.hasAuth ? <MainLayout { ...this.props } userSignout={this.userSignout} /> : <LandingLayout { ...this.props } />}
      </div>
    );
  }
  //console.log(this.props.hasAuth);

  // render() {
  //   return (
  //     <div>
  //       <LandingLayout { ...this.props } />
  //     </div>
  //   );
  // }

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
    hasAuth: store.userState.isLoggedIn
  };
};

export default connect(mapStateToProps)(MainContainer);

