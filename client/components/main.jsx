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
    this.stopSlideshow = this.stopSlideshow.bind(this);
  }
  componentDidMount() {
  }

  userSignout() {
    clearInterval(this.props.imgSlideshow);
    this.props.dispatch({
      type: 'USER_SIGNOUT'
    });
  }

  stopSlideshow() {
    clearInterval(this.props.imgSlideshow);
  }

  render() {
    return (
      <div>
        {this.props.auth 
          ? <MainLayout { ...this.props } userSignout={this.userSignout} stopSlideshow={this.stopSlideshow}/> 
          : <LandingLayout { ...this.props } />}
      </div>
    );
  }
}

const mapStateToProps = function(store) {
  return {
    auth: store.userState.auth,
    imgSlideshow: store.imgState.imgSlideshow
  };
};

export default connect(mapStateToProps)(MainContainer);

