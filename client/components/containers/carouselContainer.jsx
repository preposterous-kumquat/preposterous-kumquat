import React from 'react';
import { connect } from 'react-redux';
import CarouselView from '../views/carousel.jsx';
import axios from 'axios';

class CarouselContainer extends React.Component {
  constructor(props) {
    super(props);
    this.featurePhoto = this.featurePhoto.bind(this);
    this.startSlideshow = this.startSlideshow.bind(this);
    this.gotoCreatePair = this.gotoCreatePair.bind(this);
  }

  //for context router to work
  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    };
  }

  componentWillMount() {
    let { imgStack, dispatch } = this.props;
    let i = 0;
    dispatch({
      type: 'FEATURE_PHOTO',
      feature: imgStack[i].url
    });
    this.startSlideshow(i);
  }

  componentDidUpdate() {
    console.log('inside component did update');
    // console.log(this.props.pairPic1);
  }

  gotoCreatePair() {
    let config = {
      id: this.props.imgStack[0].id,
      theme: this.props.imgTheme
    };
    console.log('inside gotoCreatePair | config>>>', config);
    // redirect to loading page...
    this.context.router.push('/loading');
    //clear slideshow interval...
    clearInterval(this.props.imgSlideshow);
    axios.get('/stack', {params: config}).then(res => {
      console.log('Successfully retrieved stack:', res);
      let stack = [];
      for (var key in res.data) {
        stack.push(res.data[key]);
      }
      console.log('(carouselContainer)stack>>>>', stack);
      //send stack and theme over
      this.props.dispatch({
        type: 'IMG_STACK',
        imgStack: stack
      });
      // this.props.dispatch({
      //   type: 'IMG_THEME',
      //   theme: theme
      // });

      // redirect to createPair page...
      this.context.router.push('/createPair');
    }).catch(err => {
      console.error('Error getting stack:', err);
    });
  }

  startSlideshow(slide) {
    clearInterval(this.props.imgSlideshow);
    
    let { imgStack, dispatch } = this.props;
    let i = slide;
    let slideshow = setInterval(function() {
      if (i === imgStack.length - 1) {
        i = 0;
      } else {
        i++;
      }
      console.log('i:', i);
      dispatch({
        type: 'FEATURE_PHOTO',
        feature: imgStack[i].url
      });
    }, 2500);

    dispatch({
      type: 'IMG_SLIDESHOW',
      slideshow: slideshow
    });
  }

  featurePhoto(pic) {
    console.log('inside featurePhoto pic.url>>>', pic.url);
    clearInterval(this.props.imgSlideshow);
    this.props.dispatch({
      type: 'FEATURE_PHOTO',
      feature: pic.url
    });
  }

  render() {
    console.log('array stack in carousel>>>>>>>', this.props.imgStack);
    return (
      <CarouselView {...this.props} stack={this.props.imgStack} featurePhoto={this.featurePhoto} startSlideshow={this.startSlideshow} gotoCreatePair={this.gotoCreatePair} />
    );
  }

}

const mapStateToProps = function(store) {
  return {
    imgStack: store.imgState.imgStack,
    imgFeature: store.imgState.imgFeature,
    imgSlideshow: store.imgState.imgSlideshow,
    imgTheme: store.imgState.imgTheme
  };
};

export default connect(mapStateToProps)(CarouselContainer);