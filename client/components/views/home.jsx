import React from 'react';
import { Link } from 'react-router';

// Using "Stateless Functional Components"
export default function(props) {
  var { sampleData } = props;
  // return (
  //   <div>
  //     <h1>This is the home view</h1>
  //     <table>
  //       <tbody>
  //         <tr>
  //           <td><Link to='/carousel' activeClassName="active"><img className='homePic' src={sampleData[0]} /></Link></td>
  //           <td><Link to='/carousel' activeClassName="active"><img className='homePic' src={sampleData[1]} /></Link></td> 
  //           <td><Link to='/carousel' activeClassName="active"><img className='homePic' src={sampleData[2]} /></Link></td>
  //         </tr>
  //         <tr>
  //           <td><Link to='/carousel' activeClassName="active"><img className='homePic' src={sampleData[3]} /></Link></td>
  //           <td><Link to='/carousel' activeClassName="active"><img className='homePic' src={sampleData[4]} /></Link></td> 
  //           <td><Link to='/carousel' activeClassName="active"><img className='homePic' src={sampleData[0]} /></Link></td>
  //         </tr>
  //       </tbody>
  //     </table>
  //   </div>
  // );
  return (
    <div>
      <h1>This is the home view</h1>
      <table>
        <tbody>
          <tr>
            <td><Link to='/carousel' activeClassName="active"><img className='homePic' src='./sampleData/iceCream/iceCream1.png' /></Link></td>
            <td><Link to='/carousel' activeClassName="active"><img className='homePic' src='./sampleData/sunlight-tree.jpg' /></Link></td> 
            <td><Link to='/carousel' activeClassName="active"><img className='homePic' src='./sampleData/soccer.png' /></Link></td>
          </tr>
          <tr>
            <td><Link to='/carousel' activeClassName="active"><img className='homePic' src='./sampleData/christmasLucy.jpg' /></Link></td>
            <td><Link to='/carousel' activeClassName="active"><img className='homePic' src='./sampleData/motherChild.png' /></Link></td> 
            <td><Link to='/carousel' activeClassName="active"><img className='homePic' src='./sampleData/camping.png' /></Link></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}


