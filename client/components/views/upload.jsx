import React from 'react';
// import { Link } from 'react-router';
import XHRUploader from 'react-xhr-uploader';

// Using "Stateless Functional Components"
export default props => {
  var { uploadPhoto } = props;
  var handleSubmit = (e) => {
    //e.preventDefault();
    var img = $('#img').val();
    console.log('image>>>>>>>>', img);
    uploadPhoto(img);
    $('#img').val('');
  };

  return (
    <div>
      <h1>This is the upload view</h1>
      <form encType="multipart/form-data" name="photo" onSubmit={e => handleSubmit(e)}>
        <input type="file" name="photo" id='img' />
        <button type="submit">UPLOAD</button>
      </form>
    </div>
  );

//------------using XHRuploader-----------------//
  // return (
  //   <div>
  //     <h1>This is the upload view</h1>
  //     <XHRUploader fieldName='photo' url='http://localhost:3000/upload' />
  //   </div>
  // );

  // return (
  //   <div>
  //     <h1>This is the upload view</h1>
  //     <form encType="multipart/form-data" name="photo" method="POST" action="http://localhost:3000/upload">
  //       <input type="file" name="photo" />
  //       <input type="submit" value="UPLOAD" />
  //     </form>
  //   </div>
  // );
};

// <button type="submit">UPLOAD</button>
// encType="multipart/form-data"
