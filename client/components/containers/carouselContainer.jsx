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


  componentWillMount() {
    $('body').addClass('loaded');
  }

  componentDidUpdate() {
    console.log('inside component did update');
    //owl carousel
    $('#owl-demo').owlCarousel({
   
      navigation: true, // Show next and prev buttons
      slideSpeed: 300,
      paginationSpeed: 400,
      singleItem: true,

      autoPlay: 2000,
      stopOnHover: true
 
      // "singleItem:true" is a shortcut for:
      // items : 1, 
      // itemsDesktop : false,
      // itemsDesktopSmall : false,
      // itemsTablet: false,
      // itemsMobile : false
    });

    // Custom Navigation Events
    // $('.next').click(function() {
    //   owl.trigger('owl.next');
    // });
    // $('.prev').click(function() {
    //   owl.trigger('owl.prev');
    // });
    // $('.play').click(function() {
    //   owl.trigger('owl.play', 2000); //owl.play event accept autoPlay speed as second parameter
    // });
    // $('.stop').click(function() {
    //   owl.trigger('owl.stop');
    // });

    //slick carousel
    // $('.center').slick({
    //   centerMode: true,
    //   // centerPadding: '60px',
    //   centerPadding: '20px',
    //   slidesToShow: 3,
    //   responsive: [
    //     {
    //       breakpoint: 768,
    //       settings: {
    //         arrows: true,
    //         centerMode: true,
    //         // centerPadding: '40px',
    //         centerPadding: '10px',
    //         slidesToShow: 3
    //       }
    //     },
    //     {
    //       breakpoint: 480,
    //       settings: {
    //         arrows: true,
    //         centerMode: true,
    //         // centerPadding: '40px',
    //         centerPadding: '10px',
    //         slidesToShow: 1
    //       }
    //     }
    //   ]
    // });
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
    console.log('array stack>>>>>>>', this.props.imgStack);
    return (
      // <CarouselView users={this.props.users} />
      <CarouselView stack={this.props.imgStack} users={this.props.users} sampleData={sampleData} />
      // <div id="owl-demo" className="owl-carousel owl-theme">
        // {stack.map((pic, i) => (
            // <div className="item" key={i}>
              // <img className='carousel' src={pic.url} />
            // </div>
        // ))}  
      // </div>
    );
  }

}

const mapStateToProps = function(store) {
  return {
    imgStack: store.imgState.imgStack
  };
};

export default connect(mapStateToProps)(CarouselContainer);