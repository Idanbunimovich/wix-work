import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import './Image.scss';
import Modal from "./Modal";

class Image extends React.Component {
  static propTypes = {
    dto: PropTypes.object,
    galleryWidth: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.calcImageSize = this.calcImageSize.bind(this);
    this.state = {
      size: 200,
      filterArray:['none','blur(5px)','contrast(200%)','grayscale(80%)','drop-shadow(16px 16px 20px red) invert(75%)','hue-rotate(90deg)'],
      filterIndex: 0,
      isOpen:false
    };
  }
  filterImage = () => {
    if(this.state.filterIndex < 5){
      this.setState({filterIndex: (this.state.filterIndex + 1)})
    }
    else{
      this.setState({filterIndex: 0})
    }

  }
  showModal = () => {
    this.setState({isOpen: true});
  };

  hideModal = () => {
    this.setState({isOpen: false});
  }


  calcImageSize() {
    const {galleryWidth} = this.props.galleryWidth;
    const targetSize = 200;
    const imagesPerRow = Math.round(galleryWidth / targetSize);
    const size = (galleryWidth / imagesPerRow);
    this.setState({
      size:size
    });
  }


  componentDidMount() {
    this.calcImageSize();

  }

  urlFromDto(dto) {
    return `https://farm${dto.farm}.staticflickr.com/${dto.server}/${dto.id}_${dto.secret}.jpg`;
  }

  render() {
    return (
      <div
        className="image-root"
        style={{
          display: "flex",
          backgroundImage: `url(${this.urlFromDto(this.props.dto)})`,
          filter: this.state.filterArray[this.state.filterIndex],
          width: this.state.size + 'px',
          height: this.state.size + 'px'
        }}
      >
        <div className='buttons'>
          <FontAwesome
            className="image-icon"
            name="clone"
            title="clone"
            onClick={this.props.onDuplicate}

          />
          <FontAwesome
            className="image-icon"
            name="filter"
            title="filter"
            onClick={this.filterImage}
          />
          <FontAwesome
            className="image-icon"
            name="expand"
            title="expand"
            onClick={this.showModal}
          />
        </div>
        {this.state.isOpen ===true?
          <Modal hideModal={this.hideModal} show={this.state.isOpen} >
            <div
              className='diviel'
              style={{
                display: "flex",
                backgroundImage: `url(${this.urlFromDto(this.props.dto)})`,
                backgroundRepeat:'no-repeat',
                width: '100%',
                height: '100%'
              }}>

            </div>
          </Modal> : null

        }

      </div>
    );
  }
}

export default Image;
