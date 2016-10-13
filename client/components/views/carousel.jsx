import React from 'react';
// import Carousel from 'nuka-carousel';
// import LoadingView from './loading.jsx';
// import { Link } from 'react-router';

// Using "Stateless Functional Components"
export default function(props) {
  let { stack, imgTheme, featurePhoto, imgFeature, startSlideshow, gotoCreatePair } = props;
  console.log('inside carousel view | stack>>>>>', stack);
  console.log('inside carousel view | imgFeature>>>>>', imgFeature);
  let themeURL = '../../resources/images/' + imgTheme + '.png';
  console.log('themeURL', themeURL);
  return (
    <div className='carouselALL'>
      <div className='carouselMINI'>
        <span><img className='carouselTHEME' src={themeURL} /></span>
        {stack.map((pic, i) => (
          <span className='miniPIC' key={i}
            style={{ backgroundImage: `url('${ pic.url }')`}}
            onMouseEnter={(e) => featurePhoto(pic)}
            onMouseLeave={(e) => startSlideshow(i)} >
          </span>
        ))}
      </div>
      <div className='carouselFEATURE'>
        <img src={imgFeature}/>
      </div>
      <div>
        <button className='pairButton' onClick={(e) => gotoCreatePair()}>Create a photo pair!</button>
      </div>
    </div>
  );
}















