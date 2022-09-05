import React from 'react';
import $ from 'jquery';
import { Image } from 'semantic-ui-react'

export default class PictureUploader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      picture: false,
      src: false
    }
  }

  handlePictureSelected(event) {
    var picture = event.target.files[0];
    var src     = URL.createObjectURL(picture);

    this.setState({
      picture: picture,
      src: src
    });
  }

  renderPreview() {
    if(this.state.src) {
      return (
        <img src={this.state.src}/>
      );
    } else {
      return (
        <p>
          <Image className=" imageborder ui bordered middle aligned tiny small circular right floated image"  src='https://easydrawingguides.com/wp-content/uploads/2021/09/Dog-Pixel-Art-step-by-step-drawing-tutorial-step-10.png' size='small' circular />
        </p>
      );
    }
  }

  upload() {
    var formData = new FormData();

    formData.append("file", this.state.picture);

    $.ajax({
      url: "/some/api/endpoint",
      method: "POST",
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      success: function(response) {
        // Code to handle a succesful upload
      }
    });
  }

  render() {
    return (
      <div>
        
        <h5>Picture Uploader</h5>
        <Image className="ui bordered middle aligned tiny small circular right floated image"  src='https://easydrawingguides.com/wp-content/uploads/2021/09/Dog-Pixel-Art-step-by-step-drawing-tutorial-step-10.png' size='small' circular />
        
        <input
          type="file"
          onChange={this.handlePictureSelected.bind(this)}
        />
        <br/>
        <div>
        {this.renderPreview()}
        </div>
        <button
          onClick={this.upload.bind(this)}
        >
          Upload
        </button>
      </div>
    );
  }
}