import React from 'react';
import { Link } from 'react-router';

export default class LandingLayout extends React.Component {
  render() {
    return (
			<div>
				<div className='navBar'>
          <ul>
            <li>
              <Link to='/signin'>SIGN IN</Link>
            </li>
            <li>
              <Link to='/signup'>SIGN UP</Link>
            </li>
          </ul>
				</div>
			</div>
		);
  }
}

// ReactDOM.render((
//   <Router>
//     <Route path="/" component={MainLayout}>
//         <Route path="home" component={Home} />
//         <Route path="upload" component={Upload} />
//         <Route path="carousel" component={Carousel} />
//         <Route path="signup" component={SignUp} />
//     </Route>
//   </Router>
// ), document.getElementById('app'));