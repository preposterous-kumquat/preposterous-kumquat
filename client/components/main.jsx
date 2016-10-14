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
    this.highlightLOGO = this.highlightLOGO.bind(this);
    this.unhighlightLOGO = this.unhighlightLOGO.bind(this);
    this.navLoc = this.navLoc.bind(this);
    this.visitLanding = this.visitLanding.bind(this);
  }

  //for context router to work
  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    };
  }

  componentDidUpdate() {
    console.log('did update');
    // this.navLoc('#homeNAV');
  }

  componentWillMount() {
    this.props.dispatch({
      type: 'LOGO_OFF'
    });
  }

  componentDidMount() {
    // this.navLoc('#homeNAV');
    console.log('this.props.children>>>', this.props.children);
    if (this.props.children === null) {
      this.context.router.push('/landing');
    }
  }

  userSignout() {
    clearInterval(this.props.imgSlideshow);
    this.props.dispatch({
      type: 'USER_SIGNOUT'
    });
  }

  stopSlideshow() {
    clearInterval(this.props.imgSlideshow);
    this.props.dispatch({
      type: 'RESET_PREVIEW'
    });
    this.props.dispatch({
      type: 'LEAVE_LANDING'
    });
  }

  highlightLOGO() {
    this.props.dispatch({
      type: 'LOGO_ON'
    });
  }

  unhighlightLOGO() {
    this.props.dispatch({
      type: 'LOGO_OFF'
    });
  }

  visitLanding(atLanding) {
    if (atLanding === true) {
      this.props.dispatch({
        type: 'VISIT_LANDING'
      });
    } else {
      this.props.dispatch({
        type: 'LEAVE_LANDING'
      });
    }
  }

  navLoc(page) {
    if (page === 'logo') {
      this.highlightLOGO();
    } else {
      this.unhighlightLOGO();
    }
    $('#homeNAV').removeClass('pop off').addClass('text');
    $('#uploadNAV').removeClass('pop off').addClass('text');
    $('#communityNAV').removeClass('pop off').addClass('text');
    $(page).removeClass('text').addClass('pop off');
  }

  render() {
    return (
      <div>
        {this.props.auth 
          ? <MainLayout { ...this.props } userSignout={this.userSignout} stopSlideshow={this.stopSlideshow} highlightLOGO={this.highlightLOGO} unhighlightLOGO={this.unhighlightLOGO} navLoc={this.navLoc} visitLanding={this.visitLanding}/> 
          : <LandingLayout { ...this.props } highlightLOGO={this.highlightLOGO} unhighlightLOGO={this.unhighlightLOGO} />}
      </div>
    );
  }
}

const mapStateToProps = function(store) {
  return {
    auth: store.userState.auth,
    imgSlideshow: store.imgState.imgSlideshow,
    logoURL: store.imgState.logoURL,
    onLandingPage: store.userState.onLandingPage
  };
};

export default connect(mapStateToProps)(MainContainer);

