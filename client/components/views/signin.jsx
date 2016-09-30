import React from 'react';
import { Link } from 'react-router';

// Using "Stateless Functional Components"
export default function(props) {
  var { userSignin } = props;
  // var { text, dispatch } = this.props
  //     // var text = this.props.text
  //     // var dispatch = this.props.dispatch
  return (
    <div>
      <h1>This is the signin view</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        userSignin($('#email').val(), $('#pw').val());
        $('#email').val('');
        $('#pw').val('');
      }}>
        <input type="text" placeholder='Email Address' id='email' /><br/>
        <input type="password" placeholder='Password' id='pw' /><br/>
        <button type="submit"> LOGIN </button>
        <Link to='/signup'><button>SIGN UP</button></Link>
      </form>
    </div>
  );
}


