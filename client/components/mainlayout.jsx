import React from 'react';
import { Link } from 'react-router';

export default class MainLayout extends React.Component {
  render() {
    return (
			<div>
				<div className='navBar'>
          <ul>
            <li>
              <Link to='/home'>HOME</Link>
            </li>
            <li>
              <Link to='/upload'>UPLOAD PHOTO</Link>
            </li>
            <li>
              <Link to='/signin'>SIGN OUT</Link>
            </li>
          </ul>
				</div>
			</div>
		);
  }
}

ReactDOM.render((
  <Router>
    <Route path="/" component={MainLayout}>
        <Route path="home" component={Home} />
        <Route path="upload" component={Upload} />
        <Route path="carousel" component={Carousel} />
        <Route path="signup" component={SignUp} />
        <Route path="signin" component={SignIn} />
    </Route>
  </Router>
), document.getElementById('app'));