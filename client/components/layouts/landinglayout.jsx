import React from 'react';
import { Link } from 'react-router';
import LandingView from '../views/landing.jsx';

export default props => {
  // $('#signupNav').on('mouseenter mouseleave', function() {
  //   $(this).toggleClass('changeButtonColor');
  // });

  // $('#signinNav').on('mouseenter mouseleave', function() {
  //   $(this).toggleClass('changeFontColor');
  // });
  // console.log('children>>>', props.children);
  let { logoURL, highlightLOGO, unhighlightLOGO } = props;
  $('button.btn.nav.text').on('mouseenter mouseleave', function() {
    $(this).toggleClass('changeFontColor');
  });
  // let display = props.children || LandingView;
  // console.log('display>>>', display);
  console.log('logoURL', logoURL);
  return (
    <div className='contentBox'>
      <nav className='navBar'>

        <div>
          <Link to='/landing' activeClassName="active" onMouseEnter={highlightLOGO} onMouseLeave={unhighlightLOGO}>
            <img className='logo' src={logoURL} />
          </Link>
        </div>

        <div>
          <Link to='/community' activeClassName="active">
            <button id='signinNav' className='btn nav text'>Explore</button>
          </Link>
          <Link to='/signin' activeClassName="active">
            <button id='signinNav' className='btn nav text'>Log In</button>
          </Link>
          <Link to='/signup' activeClassName="active">
            <button id='signupNav' className='btn nav pop'>Join Our Community</button>
          </Link>
        </div>
      </nav>

      <main>
        <center>{props.children}</center>
      </main>
    </div>
  );
};

// <button id='signinNav' className='btn nav text'>Lensity</button>