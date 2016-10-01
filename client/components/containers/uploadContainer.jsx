import React from 'react';
import { connect } from 'react-redux';
import UploadView from '../views/upload.jsx';
import store from '../../store.jsx';
import axios from 'axios';

// class UploadContainer extends React.Component {
//   constructor(props) {
//     super(props);
//     this.uploadPhoto = this.uploadPhoto.bind(this);
//   }

//   uploadPhoto(img) {
//     let reader = new FileReader();
//     axios.post('/upload', img).then(res => {
//       console.log('upload res>>>>>>>>>>', res);
//     }).catch(err => {
//       console.log('Error uploading photo:', err);
//     });
//   }

//   render() {
//     return (
//       <UploadView uploadPhoto={this.uploadPhoto} />
//     );
//   }

// }

// const mapStateToProps = function(store) {
//   return {
//     //users: store.userState.users
//   };
// };

// export default connect(mapStateToProps)(UploadContainer);

//TODO: refactor to separate container and view
class UploadContainer extends React.Component {
  constructor(props) {
    super(props);
    //this.state = {file: '',imagePreviewUrl: ''};
    console.log('uploadContainer loaded');
  }
  
  //for context router to work
  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    };
  }

  _handleSubmit(e) {
    e.preventDefault();
    var formData = new FormData();
    var userPhoto = new Blob([this.props.file], { type: 'image/png'});
    var theme = $('#theme').val();
    formData.append('photo', userPhoto);
    formData.append('theme', theme);

    if (theme) {
      console.log('file>>>>>>>', this.props.file);
      axios.post('/upload', formData).then(res => {
        console.log('Successfully uploaded photo:', res);
        this.context.router.push('/carousel');
      }).catch(err =>{
        console.log('Error uploading photo:', err);
      });
    } else {
      alert('Please enter a theme.');
    }
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      store.dispatch({
        type: 'IMG_FILE',
        file: file
      });
      store.dispatch({
        type: 'IMG_THUMB',
        imgThumb: reader.result
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    let { hasAuth, imgThumb, file } = this.props;
    let $imagePreview = null;
    if (imgThumb) {
      $imagePreview = (<img src={imgThumb} className='imgThumb' />);
    } else {
      $imagePreview = (<div>Please select an Image for Preview</div>);
    }

    return (
      <div>
        <form onSubmit={(e) => this._handleSubmit(e)}>
          <select id='theme' required>
            <option value=''>select a theme...</option>
            <option value="cats">cats</option>
            <option value="love">love</option>
            <option value="ice_cream">ice cream</option>
          </select><br /> 
          <input type='file' onChange={(e)=>this._handleImageChange(e)} /><br />
          <button type='submit' onClick={(e)=>this._handleSubmit(e)}>UPLOAD IMG</button>
        </form>
        <div>
          {$imagePreview}
        </div>
      </div>
    );
  }
}

const mapStateToProps = function(store) {
  return {
    hasAuth: store.userState.isLoggedIn,
    imgThumb: store.imgState.imgThumb,
    file: store.imgState.file
  };
};
  
export default connect(mapStateToProps)(UploadContainer);
//React.render(<ImageUpload/>, document.getElementById("mainApp"));