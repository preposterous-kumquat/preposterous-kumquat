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
import LoadingView from './components/views/loading.jsx';
import CreatePairContainer from './components/containers/createpairContainer.jsx';
import PairViewContainer from './components/containers/pairviewContainer.jsx';
import CommunityContainer from './components/containers/communityContainer.jsx';

export default (
  <Router history={hashHistory}>
    <Route path="/" component={MainContainer}>
      <Route path="home" component={HomeContainer} />
      <Route path="upload" component={UploadContainer} />
      <Route path="carousel" component={CarouselContainer} />
      <Route path="signin" component={SigninContainer} />
      <Route path="signup" component={SignupContainer} />
      <Route path="loading" component={LoadingView} />
      <Route path="createpair" component={CreatePairContainer} />
      <Route path="pairview" component={PairViewContainer} />
      <Route path="community" component={CommunityContainer} />
   </Route>
  </Router>
);

