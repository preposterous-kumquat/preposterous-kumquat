import React from 'react';
import { Link } from 'react-router';

// Using "Stateless Functional Components"
export default function(props) {
  var { userSignup } = props;
  let background = '../../resources/images/landing.png';

  return (
    <div className='landing' style={{ backgroundImage: `url('${ background }')`}}>
      <div className='enterForm'>
        <form className='enter' onSubmit={(e) => {
          e.preventDefault();
          var name = $('#name').val();
          var email = $('#email').val();

          var loc = $('#loc').val();

          var pw = $('#pw').val();
          var cpw = $('#cpw').val();
          if (pw !== cpw) {
            alert('Your passwords do not match.  Please try again.');
          } else {
            userSignup(name, email, loc, pw);
            $('#name').val('');
            $('#email').val('');
            // $('#loc').val('');
            $('#pw').val('');
            $('#cpw').val('');
          }
        }}>
          <input type="text" placeholder='Name' id='name' />
          <input type="text" placeholder='Email' id='email' />
          <input type="password" placeholder='Password' id='pw' />
          <input type="password" placeholder='Confirm Password' id='cpw' />

          <select id='loc' required>
          <option id='defaultLoc' value=''>Your Location...</option>
          {countries.map((country, i) =>
            <option key={i} value={country}>{country}</option>
          )}
          </select>

          <button className='submit' type="submit"> SIGN UP </button>
        </form>
      </div>
    </div>
  );
}

    // <div>
    //   <h1>This is the signup view</h1>
    //   <form onSubmit={(e) => {
    //     e.preventDefault();
    //     var name = $('#name').val();
    //     var email = $('#email').val();

    //     var loc = $('#loc').val();

    //     var pw = $('#pw').val();
    //     var cpw = $('#cpw').val();
    //     if (pw !== cpw) {
    //       alert('Your passwords do not match.  Please try again.');
    //     } else {
    //       userSignup(name, email, loc, pw);
    //       $('#name').val('');
    //       $('#email').val('');
    //       // $('#loc').val('');
    //       $('#pw').val('');
    //       $('#cpw').val('');
    //     }
    //   }}>
    //     <input type="text" placeholder='Name' id='name' /><br/>
    //     <input type="text" placeholder='Email' id='email' /><br/>
    //     <input type="password" placeholder='Password' id='pw' /><br/>
    //     <input type="password" placeholder='Confirm Password' id='cpw' /><br/>

    //     <select id='loc' required>
    //     <option value=''>Your Location...</option>
    //     {countries.map((country, i) =>
    //       <option key={i} value={country}>{country}</option>
    //     )}
    //     </select><br /> 

    //     <button type="submit"> SIGN UP </button>
    //     <Link to='/signin'><button> LOGIN </button></Link>
    //   </form>
    // </div>


