import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

// Layouts
import MainLayout from './components/layouts/mainlayout.jsx';
import LandingLayout from './components/layouts/landinglayout.jsx';

// Pages
import MainContainer from './components/main.jsx';
import HomeContainer from './components/containers/homeContainer.jsx';
import CarouselContainer from './components/containers/carouselContainer.jsx';
import UploadContainer from './components/containers/uploadContainer.jsx';
import SignupContainer from './components/containers/signupContainer.jsx';
import SigninContainer from './components/containers/signinContainer.jsx';

//TODO: fix routes

export default () => (
  <Router history={hashHistory}>
    <Route path="/" component={MainContainer}>
      <Route path="home" component={HomeContainer} />
      <Route path="upload" component={UploadContainer} />
      <Route path="carousel" component={CarouselContainer} />
      <Route path="signin" component={SigninContainer} />
      <Route path="signup" component={SignupContainer} />
   </Route>
  </Router>
);
// export default (
//   <Router history={browserHistory}>
//     <Route path="/" component={MainContainer}>
//       <IndexRoute component={MainLayout}>
//           <Route path="home" component={Home} />
//           <Route path="upload" component={Upload} />
//           <Route path="carousel" component={Carousel} />
//           <Route path="signin" component={SignIn} />
//       </IndexRoute>
//       <IndexRoute component={LandingLayout}>
//           <Route path="signup" component={SignUp} />
//           <Route path="signin" component={SignIn} />
//       </IndexRoute>
//    </Route>
//   </Router>
// );
