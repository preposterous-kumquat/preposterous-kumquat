import React from 'react';
import Carousel from 'nuka-carousel';
import LoadingView from './loading.jsx';

// Using "Stateless Functional Components"
export default (props) => {
  let { pairPic1, pairPic2, mapURL, theme } = props;
  console.log('theme>>>', theme);
  // let themeURL = '../../resources/images/' + theme + '.png';
  // console.log('theme URL', themeURL);
  return (
    <div className='allContentPV containerMAIN' >
      <div className='pairContainerPV'>
        <span className='picBoxPV'>
          <img className='pairPicPV' id='pairPic1PV' src={pairPic1.url || pairPic1.file_url} />
        </span>
        <span className='picBoxPV'>
          <img className='pairPicPV' id='pairPic2PV' src={pairPic2.url || pairPic2.file_url} />
        </span>
      </div>
      <div className='mapBoxPV'>
        <img src={mapURL} id='googleMapPV' />
      </div>
    </div>
  );
};












