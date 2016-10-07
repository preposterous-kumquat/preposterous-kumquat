import React from 'react';
import Carousel from 'nuka-carousel';
// import { Link } from 'react-router';

// Using "Stateless Functional Components"
export default function(props) {
  console.log('inside carousel view>>>>>', props.stack[0]);

  return (
    <div id="owl-demo" className="owl-carousel owl-theme">
      {
        props.stack.map((pic, i) => 
          <div className="item" key={i}>
            <img className='carousel' src={pic.url}/>
          </div>
        )
      }  
    </div>

  );

}

//   // return (
//   //   <div id="owl-demo" className="owl-carousel owl-theme">
     
//   //     <div className="item"><img className='carousel' src='./sampleData/iceCream/iceCream3.png' /></div>
//   //     <div className="item"><img className='carousel' src='./sampleData/iceCream/iceCream7.png' /></div>
//   //     <div className="item"><img className='carousel' src='./sampleData/iceCream/iceCream8.png' /></div>
     
//   //   </div>

//   //     // <div className="customNavigation">
//   //     //   <a className="btn prev">Previous</a>
//   //     //   <a className="btn next">Next</a>
//   //     //   <a className="btn play">Autoplay</a>
//   //     //   <a className="btn stop">Stop</a>
//   //     // </div>
//   // );
// }

// export default props => {
//   let images = props.stack.map((pic, i) => (
//       <img key={i} src={pic.url} />
//   ));

//   return (<Carousel className='ncarousel'>{ images }</Carousel>);
// };

// export default props => {
//   let pic = props.stack[0];

//   return <img src={pic.url} />;
// };

/*
props.stack.map((pic, i) => (
          <div className="item" key={i}>

            <img className='carousel' src={pic.url} />
          </div>
      ))
*/



// OLD SLICK CAROUSEL
  // return (
  //   <div>
  //     <h1>This is the carousel view</h1>
  //     <div className='center'>
  //       <div className='slide'>
  //         <img src={props.sampleData[0]} />
  //       </div>
  //       <div className='slide'>
  //         <img src={props.sampleData[1]} />
  //       </div>
  //       <div className='slide'>
  //         <img src={props.sampleData[2]} />
  //       </div>
  //       <div className='slide'>
  //         <img src={props.sampleData[3]} />
  //       </div>
  //       <div className='slide'>
  //         <img src={props.sampleData[4]} />
  //       </div>
  //       <div className='slide'>
  //         <img src={props.sampleData[5]} />
  //       </div>
  //     </div>

  //   </div>
  // );











