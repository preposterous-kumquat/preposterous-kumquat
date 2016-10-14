import React from 'react';
import { connect } from 'react-redux';
import UploadView from '../views/upload.jsx';
// import store from '../../store.jsx';
import axios from 'axios';

class UploadContainer extends React.Component {
  constructor(props) {
    super(props);

  }
  
  //for context router to work
  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    };
  }

  componentWillMount() {
    // clearInterval(this.props.imgSlideshow);
  }

  componentDidMount() {
    //select upload button upon refresh
    $('#uploadNAV').removeClass('text').addClass('pop off');

    // $('.theme').on('click', function() {
    //   $(this).addClass('selected');
    // });
  }

  _handleSubmit(e) {
    e.preventDefault();
    var formData = new FormData();
    var userPhoto = new Blob([this.props.file], {type: 'image/png'});
    // var theme = $('#theme').val();
    var theme = $('#theme').text();
    console.log('theme>>>>>', theme);
    formData.append('photo', userPhoto);
    formData.append('theme', theme);

    // if (!this.props.file) {
    if (!this.props.imgThumb) {
      alert('Please choose a file.');
    } else if (!theme) {
      alert('Please select a theme.');
    } else {
      console.log('file>>>>>>>', this.props.file);
      
      // redirect to loading page...
      this.context.router.push('/loading');

      //check for valid jpeg later...
      axios.post('/upload', formData).then(res => {
        console.log('Successfully uploaded photo:', res);

        //reset image preview
        this.props.dispatch({
          type: 'IMG_THUMB',
          imgThumb: null
        });

        let config = {
          id: res.data.id,
          theme: theme
        };
        axios.get('/stack', {params: config}).then(res => {
          console.log('Successfully retrieved stack:', res);
          let stack = [];
          for (var key in res.data) {
            stack.push(res.data[key]);
          }
          console.log('stack>>>>', stack);
          //send stack over
          this.props.dispatch({
            type: 'IMG_STACK',
            imgStack: stack
          });
          
          // redirect to carousel page...
          this.context.router.push('/carousel');
        }).catch(err => {
          console.log('Error getting stack:', err);
        });
        console.log('photoID:', res.data.id);
        console.log('theme', theme);
        //endpoint to get stacks: '/stack'
        //id: <photoID>, theme: <theme>
      }).catch(err => {
        console.log('Error uploading photo:', err);
      });
    }
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.props.dispatch({
        type: 'IMG_FILE',
        file: file
      });
      this.props.dispatch({
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
    let background = '../../resources/images/upload1.png';

    if (imgThumb) {
      $imagePreview = (<img src={imgThumb} className='imgThumb' />);
    } else {
      $imagePreview = (<div id='imgPreviewText'>Please select an Image for Preview</div>);
    }

    return (
      <div className='uploading' style={{ backgroundImage: `url('${ background }')`}}>

        <div className='enterForm upload'>
          <p className='themeText' >Select a theme:</p>  
          <div id='themeContainer'>
            <img className='theme' title='mealtime' src='../../resources/images/mealtime.png' onClick={(e) => this.selectTheme('mealtime', e.target)} />
            <img className='theme' title='friendship' src='../../resources/images/friendship.png' onClick={(e) => this.selectTheme('friendship', e.target)} />
            <img className='theme' title='celebration' src='../../resources/images/celebration.png' onClick={(e) => this.selectTheme('celebration', e.target)} />
            <br />
            <img className='theme' title='marriage' src='../../resources/images/marriage.png' onClick={(e) => this.selectTheme('marriage', e.target)} />
            <img className='theme' title='family' src='../../resources/images/family.png' onClick={(e) => this.selectTheme('family', e.target)} />
            <img className='theme' title='religion' src='../../resources/images/religion.png' onClick={(e) => this.selectTheme('religion', e.target)} />

            <br />
            <img className='theme' title='parenthood' src='../../resources/images/parenthood.png' onClick={(e) => this.selectTheme('parenthood', e.target)} />
            <img className='theme' title='adventure' src='../../resources/images/adventure.png' onClick={(e) => this.selectTheme('adventure', e.target)} />
            <img className='theme' title='sports' src='../../resources/images/sports.png' onClick={(e) => this.selectTheme('sports', e.target)} />
            <br />

            <img className='theme hide' title='love' src='../.../resources/images/love.png' onClick={(e) => this.selectTheme('love', e.target)} />
            <img className='theme hide' title='babies' src='../../resources/images/baby.png' onClick={(e) => this.selectTheme('babies', e.target)} />
            <img className='theme hide' title='ice cream' src='../../resources/images/ice-cream.png' onClick={(e) => this.selectTheme('ice_cream', e.target)} />
            <img className='theme hide' title='cats' src='../../resources/images/cat.png' onClick={(e) => this.selectTheme('cats', e.target)} />
            <img className='theme hide' title='nature' src='../../resources/images/nature.png' onClick={(e) => this.selectTheme('nature', e.target)} />
          </div>
          <p id='theme'></p>
          <br />
          <form id='uploadForm'onSubmit={(e) => this._handleSubmit(e)}>
            <label id='uploadFile'>
              <input id='getFile' type='file' onChange={(e)=>this._handleImageChange(e)} />
              Choose File
            </label>
            <button className='submit upload' type='submit'>Upload Image</button>
          </form>
          <div>
            {$imagePreview}
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = function(store) {
  return {
    hasAuth: store.userState.isLoggedIn,
    imgThumb: store.imgState.imgThumb,
    file: store.imgState.file,
    // imgSlideshow: store.imgState.imgSlideshow
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


        // <div id="loader-wrapper">
        //   <div id="loader"></div>
        //   <div className="loader-section section-left"></div>
        //   <div className="loader-section section-right"></div>
        // </div>