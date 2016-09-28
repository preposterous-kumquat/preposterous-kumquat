import React from 'react';
import { Link } from 'react-router';

export default function(props) {
  return (
    <div>
      <nav className='navBar'>
        <span>
          <Link to='/home' activeClassName="active">HOME</Link>
        </span>
        <span>|</span>
        <span>
          <Link to='/upload' activeClassName="active">UPLOAD PHOTO</Link>
        </span>
        <span>|</span>
        <span>
          <Link to='/signin' activeClassName="active">SIGN OUT</Link>
        </span>
      </nav>
      <main>
        {props.children}
      </main>
    </div>
  );
}

// export default class MainLayout extends React.Component {
//   render() {
//     return (
// 			<div>
// 				<div className='navBar'>
//           <ul>
//             <li>
//               <Link to='/home'>HOME</Link>
//             </li>
//             <li>
//               <Link to='/upload'>UPLOAD PHOTO</Link>
//             </li>
//             <li>
//               <Link to='/signin'>SIGN OUT</Link>
//             </li>
//           </ul>
// 				</div>
// 			</div>
// 		);
//   }
// }

// ReactDOM.render((
//   <Router>
//     <Route path="/" component={MainLayout}>
//         <Route path="home" component={Home} />
//         <Route path="upload" component={Upload} />
//         <Route path="carousel" component={Carousel} />
//         <Route path="signup" component={SignUp} />
//         <Route path="signin" component={SignIn} />
//     </Route>
//   </Router>
// ), document.getElementById('app'));