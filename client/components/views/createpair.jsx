import React from 'react';

// Using "Stateless Functional Components"
export default function(props) {
  let { stack, pairPic1, pairPic2, appendPhoto, removePhoto, createPair, makeMapURL } = props;

  console.log('inside create pair view>>>>>', stack);
  console.log('appendPhoto>>>', appendPhoto);

  let displayPair = !(pairPic1.lat || pairPic2.lat)
    ? <p id='emptyText'>Select two photos to create a pair.</p>
    : <img id='pairPic1' src={pairPic1.url} onClick={(e) => removePhoto(1)} />;

  console.log('displayPair', displayPair);
  // if ()
  // let sampleMap = 'https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&scale=2&size=600x230&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:0xFFFB00%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=AIzaSyDlVAAYhI3d2knKhHRedZBEntyII_PtgDI';
  // let googleMap = map.url + map.size + '&' + map.scale + '&' + map.markers + '&' + map.style + '&' + map.apikey;
  let googleMap = makeMapURL(pairPic1, pairPic2);
  return (
    <div className='allContent containerMAIN'>
      <div className='filmStrip'>
        <span onClick={(e) => createPair(pairPic1, pairPic2, googleMap)} >
          <button className='pairButtonCP'>Create Photo Pairing</button>
        </span>
        {stack.map((pic, i) => (
          <span className='picContainerFilm' onClick={(e) => appendPhoto(pic)} key={i} >
            <img className='filmStripPic' src={pic.url} />
          </span>
        ))}
      </div>
      <div className='mainContent'>
        <div className='pairContainer'>
          <span className='picBox'>
            {displayPair}
          </span>
          <span className='picBox'>
            <img id='pairPic2' src={pairPic2.url} onClick={(e) => removePhoto(2)} />
          </span>
        </div>
        <div className='mapBox'>
          <img src={googleMap} id='googleMap' />
        </div>
      </div>
    </div>
  );
}















