import React from 'react';
import { Link } from 'react-router';

// Using "Stateless Functional Components"
export default props => {
  let background = '../../resources/images/landing.png';
  return (
    <div className='landing' style={{ backgroundImage: `url('${ background }')`}}>
      <h1 className='landingText'><strong>Lensity</strong></h1>
      <hr />
      <p id='landingTagline1'>Human connection through the lens.</p>
      <p id='landingTagline2'>Finding beauty in the similarities and differences between you and the rest of the world.</p>
      <p> </p>
    </div>
  );
};

      // <div className='landingLine'></div>
      // <p className='landingLine'>____</p>
