import React from 'react';
import { connect } from 'react-redux';
import MainLayout from './layouts/mainlayout.jsx';
import LandingLayout from './layouts/landinglayout.jsx';
// import store from '../store.jsx';

class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    // why doesn't this syntax work???
    // var { hasAuth } = this.props;
    // console.log(hasAuth);
    //console.log("store.userState.isLoggedIn", store.userState.isLoggedIn);
    this.userSignout = this.userSignout.bind(this);
  }
  componentDidMount() {
    // $('#signupNav').on('mouseenter mouseleave', function() {
    //   $(this).toggleClass('changeButtonColor');
    // });
    // $('button.btn.nav.text').on('mouseenter mouseleave', function() {
    //   $(this).toggleClass('changeFontColor');
    // });
    
    // $('#signinNav').on('mouseenter mouseleave', function() {
    //   $(this).toggleClass('changeFontColor');
    // });
    //not sure if the bottom part matters
  }
  userSignout() {
    this.props.dispatch({
      type: 'USER_SIGNOUT'
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
        {this.props.auth ? <MainLayout { ...this.props } userSignout={this.userSignout} /> : <LandingLayout { ...this.props } />}
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
    auth: store.userState.auth
  };
};

export default connect(mapStateToProps)(MainContainer);

