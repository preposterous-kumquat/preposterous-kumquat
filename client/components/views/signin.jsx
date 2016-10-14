import React from 'react';
import { Link } from 'react-router';

// Using "Stateless Functional Components"
export default function(props) {
  var { userSignin } = props;
  let background = '../../resources/images/landing.png';
  return (
    <div className='landing' style={{ backgroundImage: `url('${ background }')`}}>
      <div className='enterForm'>
        <form className='enter' onSubmit={(e) => {
          e.preventDefault();
          var email = $('#email').val();
          var pw = $('#pw').val();
          userSignin(email, pw);
          $('#email').val('');
          $('#pw').val('');
        }}>
          <input className='form' type="text" placeholder='Email Address' id='email' />
          <input className='form' type="password" placeholder='Password' id='pw' />
          <div className='buttonContainer'>
            <button className='submit' type="submit"> Log In </button>
          </div>
        </form>
      </div>
      <br /><br /><br /><br /><br /><br /><br /><br />
    </div>
  );
}


            // <Link to='/signup'><button className='submit'> Sign Up </button></Link>
