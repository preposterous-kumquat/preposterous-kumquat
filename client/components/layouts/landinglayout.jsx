import React from 'react';
import { Link } from 'react-router';

export default props => {
  // $('#signupNav').on('mouseenter mouseleave', function() {
  //   $(this).toggleClass('changeButtonColor');
  // });

  // $('#signinNav').on('mouseenter mouseleave', function() {
  //   $(this).toggleClass('changeFontColor');
  // });
  $('button.btn.nav.text').on('mouseenter mouseleave', function() {
    $(this).toggleClass('changeFontColor');
  });
  return (
    <div className='contentBox'>
      <nav className='navBar'>

        <Link to='/signin' activeClassName="active">
          <button id='signinNav' className='btn nav text'>Log In</button>
        </Link>
        <Link to='/signup' activeClassName="active">
          <button id='signupNav' className='btn nav pop'>Join Our Community</button>
        </Link>
      </nav>

      <main>
        <center>{props.children}</center>
      </main>
    </div>
  );
};


