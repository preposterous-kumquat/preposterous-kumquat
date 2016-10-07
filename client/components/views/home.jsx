import React from 'react';
import { Link } from 'react-router';

// Using "Stateless Functional Components"
export default function(props) {
  var { sampleData, userName, userEmail, userPhotos } = props;
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
    : userPhotos.map(({file_url}, i) => (
        <span className='picContainer' style={{ backgroundImage: `url('${ file_url }')`}} key={i}></span>
      ));

  console.log('userPhotos>>>>', userPhotos);

  return (
    <div>
      <h1>Welcome {userName}</h1>
      <div className='homeContainer'>
        { photoElements }
      </div>
    </div>
  );
}
        // <div className='homeContainer'>
        //   <span className='picContainer'><img className='homePic' src='./sampleData/iceCream/iceCream1.png'/></span>
        //   <span className='picContainer'><img className='homePic' src='./sampleData/sunlight-tree.jpg' /></span>
        //   <span className='picContainer'><img className='homePic' src='./sampleData/soccer.png' /></span>
        //   <span className='picContainer'><img className='homePic' src='./sampleData/christmasLucy.jpg' /></span>
        //   <span className='picContainer'><img className='homePic' src='./sampleData/motherChild.png' /></span>
        //   <span className='picContainer'><img className='homePic' src='./sampleData/camping.png' /></span>
        // </div>

      // {userPhotos.length === 0 ? <p>You have not uploaded any photos yet.</p> : 
      //   userPhotos.map((pic, i) => {
      //     <span className='homeCell' key={i}><img className='homePic' src={pic.url} /></span>;
      //   })
      // }

        // <table>
        //   <tbody>
        //     <tr>
        //       <td><Link to='/carousel' activeClassName="active"><img className='homePic' src='./sampleData/iceCream/iceCream1.png' /></Link></td>
        //       <td><Link to='/carousel' activeClassName="active"><img className='homePic' src='./sampleData/sunlight-tree.jpg' /></Link></td> 
        //       <td><Link to='/carousel' activeClassName="active"><img className='homePic' src='./sampleData/soccer.png' /></Link></td>
        //     </tr>
        //     <tr>
        //       <td><Link to='/carousel' activeClassName="active"><img className='homePic' src='./sampleData/christmasLucy.jpg' /></Link></td>
        //       <td><Link to='/carousel' activeClassName="active"><img className='homePic' src='./sampleData/motherChild.png' /></Link></td> 
        //       <td><Link to='/carousel' activeClassName="active"><img className='homePic' src='./sampleData/camping.png' /></Link></td>
        //     </tr>
        //   </tbody>
        // </table>  
