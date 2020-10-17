import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './Gallery.scss';
import ImageList from "../Image/ImageList";

class Gallery extends React.Component {
  static propTypes = {
    tag: PropTypes.string
  };

  constructor(props) {
    super(props);
    Array.prototype.insert = function ( index, item ) {
      this.splice( index, 0, item );
    };
    this.state = {
      images: [],
      galleryWidth: this.getGalleryWidth(),
      duplicate:0
    };
  }

  getGalleryWidth(){
    try {
      return document.body.clientWidth;
    } catch (e) {
      return 1000;
    }
  }
  getImages(tag) {
    const getImagesUrl = `services/rest/?method=flickr.photos.search&api_key=522c1f9009ca3609bcbaf08545f067ad&tags=${tag}&tag_mode=any&per_page=100&format=json&safe_search=1&nojsoncallback=1`;
    const baseUrl = 'https://api.flickr.com/';
    axios({
      url: getImagesUrl,
      baseURL: baseUrl,
      method: 'GET'
    })
      .then(res => res.data)
      .then(res => {
        if (
          res &&
          res.photos &&
          res.photos.photo &&
          res.photos.photo.length > 0
        ) {
          this.setState({images: res.photos.photo});
        }
      });
  }

  componentDidMount() {
    let arr = [ 'A', 'B', 'D', 'E' ];
    this.getImages(this.props.tag);
    this.setState({
      galleryWidth: document.body.clientWidth
    });
  }

  componentWillReceiveProps(props) {
    this.getImages(props.tag);
  }


  onDuplicate = (index,photo) => {
    this.state.images.insert(index,photo)
    console.log("hi")
    this.setState({images : (this.state.images.concat(1))})
  }

  duplicate = () => {
    this.setState({duplicate : (this.state.duplicate + 1)})
  }

  render() {
    return (
      <div className="gallery-root">
        {this.state.images.map((dto,index) => {
          return <ImageList  key={'image-' + dto.id} onDuplicate = {this.onDuplicate}index = {index} dto={dto} galleryWidth={this.state.galleryWidth}/>;
        })}
      </div>
    );
  }
}

export default Gallery;

