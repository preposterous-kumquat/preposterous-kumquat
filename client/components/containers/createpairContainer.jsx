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
  }

  //for context router to work
  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    };
  }

  componentDidMount() {
    // $('.carousel').carousel();
  }

  componentWillMount() {
    // $('body').addClass('loaded');
    this.props.dispatch({ type: 'RESET_PIC_PAIR' });
  }

  componentDidUpdate() {
    console.log('inside component did update');
    console.log(this.props.pairPic1);
    //materialize carousel
    // $('.carousel').carousel();

    //owl carousel
    // $('#owl-demo').owlCarousel({
   
    //   navigation: true, // Show next and prev buttons
    //   slideSpeed: 300,
    //   paginationSpeed: 400,
    //   singleItem: true,
    //   autoPlay: 2000,
    //   stopOnHover: true
 
    //   // "singleItem:true" is a shortcut for:
    //   // items : 1, 
    //   // itemsDesktop : false,
    //   // itemsDesktopSmall : false,
    //   // itemsTablet: false,
    //   // itemsMobile : false
    // });

  }

  appendPhoto(pic) {
    console.log('pic>>>>>>>>>>>>>>>', pic);
    if (!this.props.pairPic1.url) {
      this.props.dispatch({
        type: 'PAIR_PIC1',
        pic
        // pic: pic
      });    
    } else {
      this.props.dispatch({
        type: 'PAIR_PIC2',
        pic
      }); 
    }
  }

  removePhoto(picNum) {
    // if (picNum === 1) {
    //   store.dispatch({
    //     type: 'PAIR_PIC1',
    //     pairPic1: {}
    //   });
    // }
    // if (picNum === 2) {
    //   store.dispatch({
    //     type: 'PAIR_PIC2',
    //     pairPic2: {}
    //   });
    // }
    this.props.dispatch({ type: 'REMOVE_PAIR_PIC' + picNum });
  }

  createPair(pic1, pic2) {
    // sample data:
    pic1 = {};
    pic2 = {};

    if (pic1.url && pic2.url) {
      const config = {
        pair1: pic1.id,
        pair2: pic2.id
      };
      console.log('Pairs>>>>>>>>', config);
      axios.post('/createPair', {params: config}).then(res => {
        console.log('Successfully created pair:', res);

        //route to pairview page
      }).catch(err => { 
        console.err('Error creating pair:', err);
      });
    } else {
      alert('Please select 2 photos to create a pair.');
    }

  }

  render() {
    //sample ice cream data
    // let sampleData = [
    //   './sampleData/iceCream/iceCream2.png',
    //   './sampleData/iceCream/iceCream3.png',
    //   './sampleData/iceCream/iceCream4.png',
    //   './sampleData/iceCream/iceCream7.png',
    //   './sampleData/iceCream/iceCream8.png',
    //   './sampleData/iceCream/iceCream10.png',
    //   'http://i.telegraph.co.uk/multimedia/archive/02622/icecream_2622398b.jpg',
    //   'http://footage.framepool.com/shotimg/qf/934595705-eis-speiseeis-grimasse-naschen-suess-geschmack.jpg'
    // ];
    console.log('array stack>>>>>>>', this.props.imgStack);
    return (
      <CreatePairView {...this.props} stack={this.props.imgStack} appendPhoto={this.appendPhoto} removePhoto={this.removePhoto} createPair={this.createPair} />
    );
  }

}

const mapStateToProps = function(store) {
  return {
    imgStack: store.imgState.imgStack,
    pairPic1: store.imgState.pairPic1,
    pairPic2: store.imgState.pairPic2
  };
};

export default connect(mapStateToProps)(CreatePairContainer);