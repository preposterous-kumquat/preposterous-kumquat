import React from 'react';
// import { Link } from 'react-router';

// Using "Stateless Functional Components"
export default function(props) {

  // return (
  //   <div>
  //     <h1>This is the carousel view</h1>     
  //   </div>
  // );

  // return (
  //   <div>
  //     <h1>This is the carousel view</h1>
  //     <div className='slides'>
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
  //     </div>

  //   </div>
  // );

  return (
    <div>
      <h1>This is the carousel view</h1>
      <div className='center'>
        <div className='slide'>
          <img src={props.sampleData[0]} />
        </div>
        <div className='slide'>
          <img src={props.sampleData[1]} />
        </div>
        <div className='slide'>
          <img src={props.sampleData[2]} />
        </div>
        <div className='slide'>
          <img src={props.sampleData[3]} />
        </div>
        <div className='slide'>
          <img src={props.sampleData[4]} />
        </div>
        <div className='slide'>
          <img src={props.sampleData[5]} />
        </div>
      </div>

    </div>

  );
}













