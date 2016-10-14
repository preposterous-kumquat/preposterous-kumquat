import React from 'react';
import { Link } from 'react-router';

// Using "Stateless Functional Components"
export default props => {

  return (
    <center>
      <div className='containerMAIN'>
        <div className='loadingContainer'>
          <h3>loading...</h3>
          <div className="loader"></div>
        </div>
      </div>
    </center>
  );
};