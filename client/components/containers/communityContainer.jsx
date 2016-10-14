import React from 'react';
import { connect } from 'react-redux';
import CommunityView from '../views/community.jsx';
// import store from '../../store.jsx';
import axios from 'axios';
// import { Router } from 'react-router';

class CommunityContainer extends React.Component {
  constructor(props) {
    super(props);

    //method bindings
    this.getPair = this.getPair.bind(this);
  }

  //for context router to work
  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    };
  }

  componentDidMount() {
    //select community button upon refresh
    $('#communityNAV').removeClass('text').addClass('pop off');
  }

  componentWillMount() {
    // send get request to get all pairs
    axios.get('/getPairs').then(res => {
      console.log('Successfully retrieved pairs:', res);
      //dispatch to store
      this.props.dispatch({
        type: 'GET_ALL_PAIRS',
        pairs: res.data
      });

      // this.context.router.push('/community');
    }).catch(err => {
      console.error('Error getting pair:', err);
    });
  }

  makeMapURL(pic1, pic2) {
    //let { pairPic1, pairPic2 } = this.props;
    let defaultLoc = 'center=12.2,8.6&zoom=1';
    console.log('inside makeMapURL');
    console.log('pair PIC 1 >>>', pic1);
    console.log('pair PIC 2 >>>', pic2);
    let marker = {
      c1: '0xFF3C80',
      c2: '0xFFFB00',
      m1: pic1.lat === undefined ? defaultLoc : Number(pic1.lat).toFixed(6) + ',' + Number(pic1.long).toFixed(6),
      m2: pic2.lat === undefined ? defaultLoc : Number(pic2.lat).toFixed(6) + ',' + Number(pic2.long).toFixed(6)
    };
    const marker1 = 'markers=color:' + marker.c1 + '%7Clabel:A%7C' + marker.m1;
    const marker2 = 'markers=color:' + marker.c2 + '%7Clabel:B%7C' + marker.m2;
    let markerChoice =
      !(pic1.lat || pic2.lat) ? defaultLoc :
      !pic1.lat ? marker2 :
      !pic2.lat ? marker1 :
      marker1 + '&' + marker2;

    if (pic1.lat !== undefined && pic2.lat !== undefined && 
        pic1.lat === pic2.lat && pic1.long === pic2.long) {
      markerChoice += '&zoom=4';
    }
    if ((pic1.lat === undefined && pic2.lat !== undefined) || (pic2.lat === undefined && pic1.lat !== undefined)) {
      markerChoice += '&zoom=4';
    }

    let map = {
      url: 'https://maps.googleapis.com/maps/api/staticmap?',
      size: 'size=1200x200',
      scale: 'scale=2',
      markers: markerChoice,
      style: 'style=feature:road|color:0xffffff|visibility:simplified',
      apikey: 'key=AIzaSyDlVAAYhI3d2knKhHRedZBEntyII_PtgDI'
    };

    let googleMap = map.url + map.size + '&' + map.scale + '&' + map.markers + '&' + map.style + '&' + map.apikey;
    console.log('google map url:', googleMap);
    return googleMap;
  }

  getPair(pic1, pic2, theme) {
    let mapURL = this.makeMapURL(pic1, pic2);
    this.context.router.push('/loading');
    const config = {
      pair1: pic1.id,
      pair2: pic2.id
    };
    axios.post('/createPair', config).then(res => {
      console.log('Successfully retrieved pair:', res);
      this.props.dispatch({
        type: 'GET_PAIR',
        pic1: pic1,
        pic2: pic2,
        mapURL: mapURL,
        theme: theme
      });
      let data = {
        pic1: pic1.id,
        pic2: pic2.id,
        theme: theme
      };
      console.log('Pairs | community>>>>>>>>', data);
      //route to pairview page
      this.context.router.push('/pairview');
    }).catch(err => { 
      console.err('Error retrieving pair:', err);
    });
  }

  render() {
    // let firstName = this.props.name.split(' ')[0];
    // let sampleData = [{
    //   pair1: {
    //     file_url: "https://s3-us-west-2.amazonaws.com/preposterous-kumquat.photos/000/000/000/007/000000000007.jpg",
    //     id: 7,
    //     lat: 19.725342248062,
    //     long: -155.0390625
    //   }, 
    //   pair2: {
    //     file_url: "https://s3-us-west-2.amazonaws.com/preposterous-kumquat.photos/000/000/000/006/000000000006.jpg",
    //     id: 6,
    //     lat: 51.8357775204529,
    //     long: 11.77734375
    //   }, 
    //   theme: "friendship"
    // }, {
    //   pair1: {
    //     file_url: "https://s3-us-west-2.amazonaws.com/preposterous-kumquat.photos/000/000/000/002/000000000002.jpg",
    //     id: 2,
    //     lat: 40.7139558263137,
    //     long: -74.53125
    //   }, 
    //   pair2: {
    //     file_url: "https://s3-us-west-2.amazonaws.com/preposterous-kumquat.photos/000/000/000/001/000000000001.jpg",
    //     id: 1,
    //     lat: 34.9579953108503,
    //     long: 135.52734375
    //   }, 
    //   theme: "mealtime"
    // }, {
    //   pair1: {
    //     file_url: "https://s3-us-west-2.amazonaws.com/preposterous-kumquat.photos/000/000/000/002/000000000002.jpg",
    //     id: 2,
    //     lat: 40.7139558263137,
    //     long: -74.53125
    //   }, 
    //   pair2: {
    //     file_url: "https://s3-us-west-2.amazonaws.com/preposterous-kumquat.photos/000/000/000/001/000000000001.jpg",
    //     id: 1,
    //     lat: 34.9579953108503,
    //     long: 135.52734375
    //   }, 
    //   theme: "mealtime"
    // }];
    let pic = "https://s3-us-west-2.amazonaws.com/preposterous-kumquat.photos/000/000/000/001/000000000001.jpg";
    let theme = 'friendship';
    let themeURL = '../../resources/images/' + theme + '.png';
    return (
      <CommunityView { ...this.props } getPair={this.getPair}/>
    );
  }

}

const mapStateToProps = function(store) {
  return {
    // auth: store.userState.auth,
    // name: store.userState.name,
    // email: store.userState.email,
    // userPhotos: store.userState.userPhotos,
    // imgSlideshow: store.imgState.imgSlideshow,
    allPairs: store.imgState.allPairs
  };
};

export default connect(mapStateToProps)(CommunityContainer);