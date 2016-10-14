import React from 'react';
import { Link } from 'react-router';

// Using "Stateless Functional Components"
export default function(props) {
  // var { sampleData, userName, userEmail, userPhotos, getStack } = props;
  var { sampleData, name, email, userPhotos, getStack } = props;
  // var userPhotos = [{url: './sampleData/iceCream/iceCream1.png'}, 
  //                   {url: './sampleData/sunlight-tree.jpg'}, 
  //                   {url: './sampleData/soccer.png'}, 
  //                   {url: './sampleData/christmasLucy.jpg'}, 
  //                   {url: './sampleData/motherChild.png'}, 
  //                   {url: './sampleData/camping.png'}];

  let photoElements = userPhotos.length === 0
    ? <p>You have not uploaded any photos yet.</p>
    // : userPhotos.map(({ file_url }) => (
    //     <span className='picContainer' style={{ backgroundImage: `url('${ file_url }')`}}></span>
    //   ));
    : <div className='homeContainer'>
        {userPhotos.map(({file_url, id, Theme}, i) => (
          <span className='picContainer' onClick={(e) => { getStack(id, Theme.theme); }}
            style={{ backgroundImage: `url('${ file_url }')`}} key={i}>
          </span>
        ))}
      </div>;

  console.log('userPhotos>>>>', userPhotos);

  return (
      <div className='containerMAIN'>
        <h1 id='welcomeText' >Welcome {name}</h1>
          { photoElements }
      </div>
  );
}
