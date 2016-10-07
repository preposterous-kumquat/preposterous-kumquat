import React from 'react';
import { Link } from 'react-router';

// Using "Stateless Functional Components"
export default function(props) {
  var { userSignin } = props;
  // var { text, dispatch } = this.props
  //     // var text = this.props.text
  //     // var dispatch = this.props.dispatch
  
  // var handleSubmit = (e) => {
  //   e.preventDefault();
  //   var email = $('#email').val();
  //   var pw = $('#pw').val();
  //   userSignin(email, pw);
  //   $('#email').val('');
  //   $('#pw').val('');
  // };

  // return (
  //   <div>
  //     <h1>This is the signin view</h1>
  //     <form onSubmit={e => handleSubmit(e)}>
  //       <input type="text" placeholder='Email Address' id='email' /><br/>
  //       <input type="password" placeholder='Password' id='pw' /><br/>
  //       <button type="submit"> LOGIN </button>
  //       <Link to='/signup'><button>SIGN UP</button></Link>
  //     </form>
  //   </div>
  // );

  return (
    <div>
      <h1>This is the signin view</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        var email = $('#email').val();
        var pw = $('#pw').val();
        userSignin(email, pw);
        $('#email').val('');
        $('#pw').val('');
      }}>
        <input className='form' type="text" placeholder='Email Address' id='email' /><br/>
        <input className='form' type="password" placeholder='Password' id='pw' /><br/>
        <div className='buttonContainer'>
          <button className='submit' type="submit"> Log In </button>
          <Link to='/signup'><button className='submit'> Sign Up </button></Link>
        </div>
      </form>
    </div>
  );
}


