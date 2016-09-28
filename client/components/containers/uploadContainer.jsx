import React from 'react';
import { connect } from 'react-redux';
import UploadView from '../views/upload.jsx';
import store from '../../store.jsx';

class UploadContainer extends React.Component {
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
      <UploadView users={this.props.users} />
    );
  }

}

const mapStateToProps = function(store) {
  return {
    //users: store.userState.users
  };
};

export default connect(mapStateToProps)(UploadContainer);