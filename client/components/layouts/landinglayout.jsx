import React from 'react';
import { Link } from 'react-router';

export default function(props) {
  return (
		<div>
			<nav className='navBar'>
        <span>
          <Link to='/' activeClassName="active">SIGN IN</Link>
        </span>
        <span>|</span>
        <span>
          <Link to='/signup' activeClassName="active">SIGN UP</Link>
        </span>
			</nav>
      <main>
        {props.children}
      </main>
		</div>
	);
}
