import React from 'react';
import { connect } from 'react-redux';
import PairView from '../views/pairview.jsx';
import axios from 'axios';

class PairViewContainer extends React.Component {
  constructor(props) {
    super(props);
    // this.appendPhoto = this.appendPhoto.bind(this);
    // this.removePhoto = this.removePhoto.bind(this);
    // this.createPair = this.createPair.bind(this);
  }

  //for context router to work
  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    };
  }

  componentDidMount() {
  }

  componentWillMount() {

  }

  componentDidUpdate() {
    console.log('inside component did update');
  }

  render() {
    return (
      <PairView {...this.props} />
    );
  }
}

const mapStateToProps = function(store) {
  return {
    mapURL: store.imgState.mapURL,
    pairPic1: store.imgState.pairViewPic1,
    pairPic2: store.imgState.pairViewPic2,
    theme: store.imgState.pairTheme
  };
};

export default connect(mapStateToProps)(PairViewContainer);