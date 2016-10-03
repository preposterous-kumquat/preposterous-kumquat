import React from 'react';
import { Link } from 'react-router';

export default props => (
  <div className='contentBox'>
    <nav className='navBar'>
      <span>
        <Link to='/home' activeClassName="active">HOME</Link>
      </span>
      <span> | </span>
      <span>
        <Link to='/upload' activeClassName="active">UPLOAD</Link>
      </span>
      <span> | </span>
      <span>
        <Link to='/signin' activeClassName="active" onClick={props.userSignout}>SIGN OUT</Link>
      </span>
    </nav>
    <main>
      {props.children}
    </main>
  </div>
);