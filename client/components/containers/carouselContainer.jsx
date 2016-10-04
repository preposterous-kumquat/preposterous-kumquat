import React from 'react';
import { connect } from 'react-redux';
import CarouselView from '../views/carousel.jsx';
import store from '../../store.jsx';

class CarouselContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  //for context router to work
  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    };
  }

  // componentWillMount() {
  //   $('body').addClass('loaded');
  // }

  componentDidMount() {
    $('.center').slick({
      centerMode: true,
      // centerPadding: '60px',
      centerPadding: '20px',
      slidesToShow: 3,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: true,
            centerMode: true,
            // centerPadding: '40px',
            centerPadding: '10px',
            slidesToShow: 3
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: true,
            centerMode: true,
            // centerPadding: '40px',
            centerPadding: '10px',
            slidesToShow: 1
          }
        }
      ]
    });
  }

  render() {
    //sample ice cream data
    let sampleData = [
      './sampleData/iceCream/iceCream2.png',
      './sampleData/iceCream/iceCream3.png',
      './sampleData/iceCream/iceCream4.png',
      // './sampleData/iceCream/iceCream5.png',
      './sampleData/iceCream/iceCream7.png',
      './sampleData/iceCream/iceCream8.png',
      './sampleData/iceCream/iceCream10.png',
      'http://i.telegraph.co.uk/multimedia/archive/02622/icecream_2622398b.jpg',
      'http://footage.framepool.com/shotimg/qf/934595705-eis-speiseeis-grimasse-naschen-suess-geschmack.jpg'
    ];
    // let sampleData = [
    //   'http://www.wallpapereast.com/static/images/nature-view-for-you-wide-wallpaper-339094.jpg',
    //   'http://www.wallpapereast.com/static/images/nature_wallpaper_hd33.jpg',
    //   'http://www.wallpapereast.com/static/images/nature-wallpaper-1440x900-004.jpg',
    //   'http://www.wallpapereast.com/static/images/6973269-nature-wallpapers-widescreen.jpg',
    //   'http://www.wallpapereast.com/static/images/nature-wallpapers-hd_VBh2qs3.jpg',
    // ];
    console.log('sampleData>>>>>>>', sampleData);
    return (
      // <CarouselView users={this.props.users} />

      <CarouselView users={this.props.users} sampleData={sampleData} />
    );
  }

}

const mapStateToProps = function(store) {
  return {
    //users: store.userState.users
  };
};

export default connect(mapStateToProps)(CarouselContainer);