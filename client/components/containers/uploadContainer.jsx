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

  componentDidMount() {
    $('theme').on('click', function() {
      $(this).addClass('selected');
    });
  }

  _handleSubmit(e) {
    e.preventDefault();
    var formData = new FormData();
    var userPhoto = new Blob([this.props.file], { type: 'image/png'});
    // var theme = $('#theme').val();
    var theme = $('#theme').text();
    console.log('theme>>>>>', theme);
    formData.append('photo', userPhoto);
    formData.append('theme', theme);

    if (theme) {
      console.log('file>>>>>>>', this.props.file);
      
      // redirect to loading page...
      this.context.router.push('/loading');

      axios.post('/upload', formData).then(res => {
        console.log('Successfully uploaded photo:', res);

        //reset image preview
        store.dispatch({
          type: 'IMG_THUMB',
          imgThumb: null
        });

        let config = {
          id: res.data.id,
          theme: theme
        };
        axios.get('/stack', {params: config}).then(res => {
          console.log('Successfully retrieved stack:', res);
          //TODO: send stack over
        }).catch(err => {
          console.log('Error getting stack:', err);
        });
        console.log('photoID:', res.data.id);
        console.log('theme', theme);
        //endpoint to get stacks: '/stack'
        //id: <photoID>, theme: <theme>

        // redirect to carousel page...
        this.context.router.push('/carousel');

      }).catch(err => {
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

  selectTheme(theme, target) {
    $('.theme').each(function() {
      $(this).removeClass('selected');
    });
    $(target).toggleClass('selected');
    $('#theme').text(theme);
    console.log('theme inside selectTheme:', $('#theme').text());
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
        <div id="loader-wrapper">
          <div id="loader"></div>
          <div className="loader-section section-left"></div>
          <div className="loader-section section-right"></div>
        </div>

        <p>Select a theme:</p>  
        <img className='theme' title='love' src='../../images/love.png' onClick={(e) => this.selectTheme('love', e.target)} />
        <img className='theme' title='ice cream' src='../../images/ice-cream.png' onClick={(e) => this.selectTheme('ice_cream', e.target)} />
        <img className='theme' title='cats' src='../../images/cat.png' onClick={(e) => this.selectTheme('cats', e.target)} />
        <img className='theme' title='ice cream' src='../../images/ice-cream.png' onClick={(e) => this.selectTheme('ice_cream', e.target)} />
        <br />
        
        <p id='theme'></p>
        
        <form onSubmit={(e) => this._handleSubmit(e)}>
          <input type='file' onChange={(e)=>this._handleImageChange(e)} /><br />
          <button type='submit'>UPLOAD IMG</button>
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

        // <form onSubmit={(e) => this._handleSubmit(e)}>
        //   <select id='theme' required>
        //     <option value=''>select a theme...</option>
        //     <option value="cats">cats</option>
        //     <option value="love">love</option>
        //     <option value="ice_cream">ice cream</option>
        //   </select><br /> 
        //   <input type='file' onChange={(e)=>this._handleImageChange(e)} /><br />
        //   <button type='submit' onClick={(e)=>this._handleSubmit(e)}>UPLOAD IMG</button>
        // </form>