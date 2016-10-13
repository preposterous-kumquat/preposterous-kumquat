import React from 'react';
import { connect } from 'react-redux';
import HomeView from '../views/home.jsx';
// import store from '../../store.jsx';
import axios from 'axios';
// import { Router } from 'react-router';

class HomeContainer extends React.Component {
  constructor(props) {
    super(props);

    //method bindings
    this.getStack = this.getStack.bind(this);
  }

  //for context router to work
  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    };
  }

  // componentDidUpdate() {
  componentWillMount() {
    // clearInterval(this.props.imgSlideshow);
    axios.get('/photos').then(res => {
      console.log('Successfully retrieved photos:', res);
      // dispatch to update user photos
      this.props.dispatch({
        type: 'USER_PHOTOS',
        userPhotos: res.data
      });
    }).catch(err => {
      console.error('Error getting photos:', err);
    });
  }

  getStack(id, theme) {
    let config = {
      id: id,
      theme: theme
    };
    console.log('inside getStack | config>>>>', config);
    // redirect to loading page...
    this.context.router.push('/loading');
    axios.get('/stack', {params: config}).then(res => {
      console.log('Successfully retrieved stack:', res);
      let stack = [];
      for (var key in res.data) {
        stack.push(res.data[key]);
      }
      console.log('(homeContainer)stack>>>>', stack);
      //send stack and theme over
      this.props.dispatch({
        type: 'IMG_STACK',
        imgStack: stack
      });
      this.props.dispatch({
        type: 'IMG_THEME',
        theme: theme
      });

      // redirect to carousel page...
      // this.context.router.push('/createPair');
      this.context.router.push('/carousel');
    }).catch(err => {
      console.error('Error getting stack:', err);
    });
  }
  render() {
    let firstName = this.props.name.split(' ')[0];
    return (
      <HomeView { ...this.props } name={firstName} getStack={this.getStack}/>
    );
  }

}

const mapStateToProps = function(store) {
  return {
    auth: store.userState.auth,
    name: store.userState.name,
    email: store.userState.email,
    userPhotos: store.userState.userPhotos,
    imgStack: store.imgState.imgStack,
    // imgSlideshow: store.imgState.imgSlideshow
  };
};

export default connect(mapStateToProps)(HomeContainer);