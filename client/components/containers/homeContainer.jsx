import React from 'react';
import { connect } from 'react-redux';
import HomeView from '../views/home.jsx';
import store from '../../store.jsx';
import axios from 'axios';
// import { Router } from 'react-router';

class HomeContainer extends React.Component {
  constructor(props) {
    super(props);

    //method bindings
    this.getUserPhotos = this.getUserPhotos.bind(this);
  }
  getUserPhotos() {
    
  }
  render() {
    let sampleData = [
      'http://www.wallpapereast.com/static/images/nature-view-for-you-wide-wallpaper-339094.jpg',
      'http://www.wallpapereast.com/static/images/nature_wallpaper_hd33.jpg',
      'http://www.wallpapereast.com/static/images/nature-wallpaper-1440x900-004.jpg',
      'http://www.wallpapereast.com/static/images/6973269-nature-wallpapers-widescreen.jpg',
      'http://www.wallpapereast.com/static/images/nature-wallpapers-hd_VBh2qs3.jpg',
    ];
    return (
      <HomeView { ...this.props } sampleData={sampleData} />
    );
  }

}

const mapStateToProps = function(store) {
  return {
    hasAuth: store.userState.isLoggedIn
  };
};

export default connect(mapStateToProps)(HomeContainer);