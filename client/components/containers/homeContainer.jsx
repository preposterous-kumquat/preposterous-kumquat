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
    // this.getUserPhotos = this.getUserPhotos.bind(this);
  }
  // getUserPhotos() {
  //   console.log('hi jo!')
  // }
  // componentDidUpdate() {
  componentWillMount() {
    axios.get('/photos').then(res => {
      console.log('Successfully retrieved photos:', res);
      // dispatch to update user photos
      // let userPhotos = [{url: './sampleData/iceCream/iceCream1.png'}, 
      //               {url: './sampleData/sunlight-tree.jpg'}, 
      //               {url: './sampleData/soccer.png'}, 
      //               {url: './sampleData/christmasLucy.jpg'}, 
      //               {url: './sampleData/motherChild.png'}, 
      //               {url: './sampleData/camping.png'}];
      store.dispatch({
        type: 'USER_PHOTOS',
        userPhotos: res.data
      });
      // store.dispatch({
      //   type: 'USER_PHOTOS',
      //   userPhotos: res.data
      // });
    }).catch(err => {
      console.error('Error getting photos:', err);
    });
  }
  render() {
    // let userPhotos = [{url: './sampleData/iceCream/iceCream1.png'}, 
    //                 {url: './sampleData/sunlight-tree.jpg'}, 
    //                 {url: './sampleData/soccer.png'}, 
    //                 {url: './sampleData/christmasLucy.jpg'}, 
    //                 {url: './sampleData/motherChild.png'}, 
    //                 {url: './sampleData/camping.png'}];
    let firstName = this.props.userName.split(' ')[0];
    let sampleData = [
      'http://www.wallpapereast.com/static/images/nature-view-for-you-wide-wallpaper-339094.jpg',
      'http://www.wallpapereast.com/static/images/nature_wallpaper_hd33.jpg',
      'http://www.wallpapereast.com/static/images/nature-wallpaper-1440x900-004.jpg',
      'http://www.wallpapereast.com/static/images/6973269-nature-wallpapers-widescreen.jpg',
      'http://www.wallpapereast.com/static/images/nature-wallpapers-hd_VBh2qs3.jpg',
    ];
    return (
      <HomeView { ...this.props } userName={firstName} sampleData={sampleData} />
      // <HomeView userPhotos={userPhotos} userName={firstName} sampleData={sampleData} />
    );
  }

}

const mapStateToProps = function(store) {
  return {
    hasAuth: store.userState.isLoggedIn,
    userName: store.userState.userName,
    userEmail: store.userState.userEmail,
    userPhotos: store.userState.userPhotos
  };
};

export default connect(mapStateToProps)(HomeContainer);