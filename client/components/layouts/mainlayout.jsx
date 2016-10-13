import React from 'react';
import { Link } from 'react-router';

export default props => {
  // $('button.btn.nav.text').on('mouseenter mouseleave', function() {
  //   $(this).toggleClass('changeFontColor');
  // });
  let { userSignout, stopSlideshow } = props;
  return (
    <div className='contentBox'>
      <nav className='navBar'>
        <Link to='/home' activeClassName="active" onClick={stopSlideshow}>
          <button id='testing' className='btn nav text'>Home</button>
        </Link>
        <Link to='/upload' activeClassName="active" onClick={stopSlideshow}>
          <button className='btn nav text'>Upload</button>
        </Link>
        <Link to='/community' activeClassName="active" onClick={stopSlideshow}>
          <button className='btn nav text'>Community</button>
        </Link>
        <Link to='/signin' activeClassName="active" onClick={userSignout}>
          <button className='btn nav text'>Sign Out</button>
        </Link>
      </nav>
      <main>
        <center>{props.children}</center>
      </main>
    </div>    
  );
};
