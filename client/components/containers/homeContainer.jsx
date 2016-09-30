import React from 'react';
import { connect } from 'react-redux';
import HomeView from '../views/home.jsx';
import store from '../../store.jsx';
import axios from 'axios';
// import { Router } from 'react-router';

class HomeContainer extends React.Component {
  constructor(props) {
    super(props);

    //method bindings
    this.getUserPhotos = this.getUserPhotos.bind(this);
  }
  getUserPhotos() {
    
  }
  render() {
    return (
      <HomeView { ...this.props } />
    );
  }

}

const mapStateToProps = function(store) {
  return {
    hasAuth: store.userState.isLoggedIn
  };
};

export default connect(mapStateToProps)(HomeContainer);