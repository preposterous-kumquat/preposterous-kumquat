import React from 'react';
import { connect } from 'react-redux';
import CarouselView from '../views/carousel.jsx';
import store from '../../store.jsx';

class CarouselContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //
    };
  }
  // componentDidMount() {
  //   userApi.getUsers();
  //   store.dispatch(loadSearchLayout('users', 'User Results'));
  // }
  render() {
    return (
      <CarouselView users={this.props.users} />
    );
  }

}

const mapStateToProps = function(store) {
  return {
    //users: store.userState.users
  };
};

export default connect(mapStateToProps)(CarouselContainer);