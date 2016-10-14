import React from 'react';
import { Link } from 'react-router';

export default props => {
  // $('button.btn.nav.text').on('mouseenter mouseleave', function() {
  //   $(this).toggleClass('changeFontColor');
  // });
  let { userSignout, stopSlideshow, logoURL, highlightLOGO, unhighlightLOGO, navLoc, onLandingPage, visitLanding } = props;
  return (
    <div className='contentBox'>
      <nav className='navBar'>

        <div>
          <Link to='/landing' activeClassName="active" onMouseEnter={highlightLOGO} 
            onMouseLeave={(e) => {
              if (!onLandingPage) {
                unhighlightLOGO();
              }
            }}
            onClick={(e) => {
              navLoc('logo');
              stopSlideshow();
              visitLanding(true);
          }}>
            <img className='logo' src={logoURL} />
          </Link>
        </div>

        <div>
          <Link to='/home' activeClassName="active" onClick={(e) => {
            stopSlideshow();
            navLoc('#homeNAV');
          }}>
            <button id='homeNAV' className='btn nav text'>Home</button>
          </Link>
          <Link to='/upload' activeClassName="active" onClick={(e) => {
            stopSlideshow();
            navLoc('#uploadNAV');
          }}>
            <button id='uploadNAV' className='btn nav text'>Upload</button>
          </Link>
          <Link to='/community' activeClassName="active" onClick={(e) => {
            stopSlideshow();
            navLoc('#communityNAV');
          }}>
            <button id='communityNAV' className='btn nav text'>Community</button>
          </Link>
          <Link to='/signin' activeClassName="active" onClick={userSignout}>
            <button className='btn nav grey'>Sign Out</button>
          </Link>
        </div>
      </nav>

      <main>
        <center>{props.children}</center>
      </main>
    </div>    
  );
};
