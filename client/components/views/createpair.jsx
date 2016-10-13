import React from 'react';
// import Carousel from 'nuka-carousel';
// import LoadingView from './loading.jsx';
// import { Link } from 'react-router';

// Using "Stateless Functional Components"
export default function(props) {
  let { stack, pairPic1, pairPic2, appendPhoto, removePhoto, createPair, makeMapURL } = props;

  console.log('inside create pair view>>>>>', stack);
  // console.log('pair PIC 1 >>>', pairPic1);
  // console.log('pair PIC 2 >>>', pairPic2);
  console.log('appendPhoto>>>', appendPhoto);
  // let defaultLoc = 'center=12.2,8.6&zoom=1';
  // let defaultLoc = 'center=37.783697,-122.408966&zoom=1';
  // let marker = {
  //   c1: '0xFF3C80',
  //   c2: '0xFFFB00',
  //   m1: pairPic1.lat === undefined ? defaultLoc : Number(pairPic1.lat).toFixed(6) + ',' + Number(pairPic1.long).toFixed(6),
  //   m2: pairPic2.lat === undefined ? defaultLoc : Number(pairPic2.lat).toFixed(6) + ',' + Number(pairPic2.long).toFixed(6)
  // };
  // const marker1 = 'markers=color:' + marker.c1 + '%7Clabel:A%7C' + marker.m1;
  // const marker2 = 'markers=color:' + marker.c2 + '%7Clabel:B%7C' + marker.m2;
  // let markerChoice =
  //   !(pairPic1.lat || pairPic2.lat) ? defaultLoc :
  //   !pairPic1.lat ? marker2 :
  //   !pairPic2.lat ? marker1 :
  //   marker1 + '&' + marker2;

  // if (pairPic1.lat !== undefined && pairPic2.lat !== undefined && 
  //     pairPic1.lat === pairPic2.lat && pairPic1.long === pairPic2.long) {
  //   markerChoice += '&zoom=4';
  // }
  // if ((pairPic1.lat === undefined && pairPic2.lat !== undefined) || (pairPic2.lat === undefined && pairPic1.lat !== undefined)) {
  //   markerChoice += '&zoom=4';
  // }
  /*if (!(pairPic1.lat || pairPic2.lat)) {
    markerChoice = defaultLoc;
  } else if (!pairPic1.lat) {
    markerChoice = marker2;
  } else if (!pairPic2.lat) {
    markerChoice = marker1;
  } else {
    markerChoice = marker1 + marker2;
  }*/
  // let displayPair = <p>Select two photos to create a pair.</p>;
  // if (!(pairPic1.lat || pairPic2.lat)) {
  //   displayPair = <img id='pairPic1' src={pairPic1.url} onClick={(e) => removePhoto(1)} />;
  // }

  let displayPair = !(pairPic1.lat || pairPic2.lat)
    ? <p id='emptyText'>Select two photos to create a pair.</p>
    : <img id='pairPic1' src={pairPic1.url} onClick={(e) => removePhoto(1)} />;

  // IIFE: immediately invoked function expression


  // let map = {
  //   url: 'https://maps.googleapis.com/maps/api/staticmap?',
  //   size: 'size=1200x200',
  //   scale: 'scale=2',
  //   markers: markerChoice,
  //   style: 'style=feature:road|color:0xffffff|visibility:simplified',
  //   apikey: 'key=AIzaSyDlVAAYhI3d2knKhHRedZBEntyII_PtgDI'
  // };

  console.log('displayPair', displayPair);
  // if ()
  // let sampleMap = 'https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&scale=2&size=600x230&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:0xFFFB00%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=AIzaSyDlVAAYhI3d2knKhHRedZBEntyII_PtgDI';
  // let googleMap = map.url + map.size + '&' + map.scale + '&' + map.markers + '&' + map.style + '&' + map.apikey;
  let googleMap = makeMapURL(pairPic1, pairPic2);
  return (
    <div className='allContent'>
      <div className='filmStrip'>
        <span id='pairSpan' onClick={(e) => createPair(pairPic1, pairPic2)} >
          <button className='pairButton'>Create Photo Pairing</button>
        </span>
        {stack.map((pic, i) => (
          <span className='picContainerFilm' onClick={(e) => appendPhoto(pic)} key={i} >
            <img className='filmStripPic' src={pic.url} />
          </span>
        ))}
      </div>
      <div className='mainContent'>
        <div className='pairView'>
          <span className='picBox'>
            {displayPair}
          </span>
          <span className='picBox'>
            <img id='pairPic2' src={pairPic2.url} onClick={(e) => removePhoto(2)} />
          </span>
        </div>
        <div className='mapDiv'>
          <img src={googleMap} id='googleMap' />
        </div>
      </div>
    </div>
  );
}















