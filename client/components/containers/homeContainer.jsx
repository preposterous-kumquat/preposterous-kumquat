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
    axios.get('/photos').then(res => {
      console.log('Successfully retrieved photos:', res);
      // dispatch to update user photos
      // let userPhotos = [{url: './sampleData/iceCream/iceCream1.png'}, 
      //               {url: './sampleData/sunlight-tree.jpg'}, 
      //               {url: './sampleData/soccer.png'}, 
      //               {url: './sampleData/christmasLucy.jpg'}, 
      //               {url: './sampleData/motherChild.png'}, 
      //               {url: './sampleData/camping.png'}];
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
    console.log('inside getStack, config>>>>', config);
    // redirect to loading page...
    this.context.router.push('/loading');
    axios.get('/stack', {params: config}).then(res => {
      console.log('Successfully retrieved stack:', res);
      let stack = [];
      for (var key in res.data) {
        stack.push(res.data[key]);
      }
      console.log('(homeContainer)stack>>>>', stack);
      //send stack over
      this.props.dispatch({
        type: 'IMG_STACK',
        imgStack: stack
      });

      // redirect to carousel page...
      this.context.router.push('/carousel');
    }).catch(err => {
      console.error('Error getting stack:', err);
    });
  }
  render() {
    // let userPhotos = [{url: './sampleData/iceCream/iceCream1.png'}, 
    //                 {url: './sampleData/sunlight-tree.jpg'}, 
    //                 {url: './sampleData/soccer.png'}, 
    //                 {url: './sampleData/christmasLucy.jpg'}, 
    //                 {url: './sampleData/motherChild.png'}, 
    //                 {url: './sampleData/camping.png'}];
    let firstName = this.props.name.split(' ')[0];
    let sampleData = [
      'http://www.wallpapereast.com/static/images/nature-view-for-you-wide-wallpaper-339094.jpg',
      'http://www.wallpapereast.com/static/images/nature_wallpaper_hd33.jpg',
      'http://www.wallpapereast.com/static/images/nature-wallpaper-1440x900-004.jpg',
      'http://www.wallpapereast.com/static/images/6973269-nature-wallpapers-widescreen.jpg',
      'http://www.wallpapereast.com/static/images/nature-wallpapers-hd_VBh2qs3.jpg',
    ];
    return (
      // <HomeView { ...this.props } userName={firstName} />
      <HomeView { ...this.props } name={firstName} getStack={this.getStack}/>
      // <HomeView userPhotos={userPhotos} userName={firstName} sampleData={sampleData} />
    );
  }

}

const mapStateToProps = function(store) {
  return {
    auth: store.userState.auth,
    name: store.userState.name,
    email: store.userState.email,
    userPhotos: store.userState.userPhotos,
    imgStack: store.imgState.imgStack
  };
};

export default connect(mapStateToProps)(HomeContainer);