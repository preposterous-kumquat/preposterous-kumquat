import React from 'react';
import { Link } from 'react-router';

export default props => {
  // $('button.btn.nav.text').on('mouseenter mouseleave', function() {
  //   $(this).toggleClass('changeFontColor');
  // });
  return (
    <div className='contentBox'>
      <nav className='navBar'>
        <Link to='/home' activeClassName="active">
          <button id='testing' className='btn nav text'>Home</button>
        </Link>
        <Link to='/upload' activeClassName="active">
          <button className='btn nav text'>Upload</button>
        </Link>
        <Link to='/signin' activeClassName="active" onClick={props.userSignout}>
          <button className='btn nav text'>Sign Out</button>
        </Link>
      </nav>
      <main>
        <center>{props.children}</center>
      </main>
    </div>    
  );
};
