import React from 'react';
import { connect } from 'react-redux';
import CreatePairView from '../views/createpair.jsx';
import axios from 'axios';

class CreatePairContainer extends React.Component {
  constructor(props) {
    super(props);
    this.appendPhoto = this.appendPhoto.bind(this);
    this.removePhoto = this.removePhoto.bind(this);
    this.createPair = this.createPair.bind(this);
    this.makeMapURL = this.makeMapURL.bind(this);
  }

  //for context router to work
  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    };
  }

  componentDidMount() {
  }

  componentWillMount() {
    this.props.dispatch({ type: 'RESET_PIC_PAIR' });
  }

  componentDidUpdate() {
    console.log('inside component did update');
    // console.log(this.props.pairPic1);
  }

  appendPhoto(pic) {
    console.log('pic>>>>>>>>>>>>>>>', pic);
    if (!this.props.pairPic1.url) {
      this.props.dispatch({
        type: 'PAIR_PIC1',
        pic
      });    
    } else {
      this.props.dispatch({
        type: 'PAIR_PIC2',
        pic
      }); 
    }
  }

  removePhoto(picNum) {
    this.props.dispatch({ type: 'REMOVE_PAIR_PIC' + picNum });
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

  createPair(pic1, pic2) {
    let mapURL = this.makeMapURL(pic1, pic2);
    if (pic1.url && pic2.url) {
      this.context.router.push('/loading');
      const config = {
        pair1: pic1.id,
        pair2: pic2.id
      };
      axios.post('/createPair', config).then(res => {
        console.log('Successfully created pair:', res);
        this.props.dispatch({
          type: 'GET_PAIR',
          pic1: res.data.pair1,
          pic2: res.data.pair2,
          mapURL: mapURL,
          theme: res.data.theme
        });
        let data = {
          pic1: res.data.pair1.id,
          pic2: res.data.pair2.id,
          theme: res.data.theme
        };
        console.log('Pairs | createpair>>>>>>>>', data);
        //route to pairview page
        this.context.router.push('/pairview');
      }).catch(err => { 
        console.err('Error creating pair:', err);
      });
    } else {
      alert('Please select 2 photos to create a pair.');
    }
  }

  render() {
    console.log('array stack>>>>>>>', this.props.imgStack);
    return (
      <CreatePairView {...this.props} stack={this.props.imgStack} appendPhoto={this.appendPhoto} removePhoto={this.removePhoto} createPair={this.createPair} makeMapURL={this.makeMapURL} />
    );
  }
}

const mapStateToProps = function(store) {
  return {
    imgStack: store.imgState.imgStack,
    pairPic1: store.imgState.pairPic1,
    pairPic2: store.imgState.pairPic2,
    imgTheme: store.imgState.pairTheme
    // imgTheme: store.imgState.imgTheme
  };
};

export default connect(mapStateToProps)(CreatePairContainer);