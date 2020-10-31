import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import './Image.scss';
import Modal from "./Modal";
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    isScrolled: state.scrollApp.isScrolled
  }
}



class Image extends React.Component {
  static propTypes = {
    dto: PropTypes.object,
    galleryWidth: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.calcImageSize = this.calcImageSize.bind(this);
    this.className = ''
    this.state = {
      animation:'',
      isIntersect:false,
      elements:[],
      size: 200,
      filterArray:['none','sepia(90%)','contrast(200%)','grayscale(80%)','drop-shadow(16px 16px 20px red) invert(75%)','hue-rotate(90deg)'],
      filterIndex: 0,
      isOpen:false,
      isLoaded:false
    };
  }


  Spinner = () => {

    return(
      <div className="post loading">
        <svg
          width="80"
          height="80"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
        >
          <circle
            cx="50"
            cy="50"
            fill="none"
            stroke="#49d1e0"
            strokeWidth="10"
            r="35"
            strokeDasharray="164.93361431346415 56.97787143782138"
            transform="rotate(275.845 50 50)"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              calcMode="linear"
              values="0 50 50;360 50 50"
              keyTimes="0;1"
              dur="1s"
              begin="0s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>
    );
  }


  filterImage = () => {
    this.setState({filterIndex: (Math.floor(Math.random() * 6) + 1)})
  }


  showModal = () => {
    this.setState({isOpen: true});
  };

  hideModal = () => {
    this.setState({isOpen: false});
  }


  calcImageSize() {
    const targetSize = 200;
    const imagesPerRow = Math.round(this.props.galleryWidth / targetSize);
    const size = (this.props.galleryWidth / imagesPerRow);
    this.setState({
      size:size
    });
  }


  intersectionCallBack = (entries) =>{
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.setState({isIntersect:true})
        this.setState({animation:'fadeIn ease 3s'})
      }
    })

  }


  intersect = () => {
    let img = Array.from(document.getElementsByClassName(`image-root ${this.props.index}`));
    let observer = new IntersectionObserver(this.intersectionCallBack)

    img.forEach(element =>{

      observer.observe(element)
    })
  }


  componentDidMount() {

    this.calcImageSize();
    let imageLoader = new Image();
    imageLoader.src = this.urlFromDto(this.props.dto);

    imageLoader.onload = () => {

      this.setState({ isLoaded:true });
    };
    imageLoader.onload()
  }


  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.isLoaded !== prevState.isLoaded) {
      this.intersect()
    }
    if (prevProps.isScrolled !== this.props.isScrolled && this.state.isIntersect) {
      this.intersect()
    }
  }

  urlFromDto(dto) {
    return `https://farm${dto.farm}.staticflickr.com/${dto.server}/${dto.id}_${dto.secret}.jpg`;
  }

  render() {
    if(this.state.isIntersect===false){
      this.className = 'url("https://miro.medium.com/max/880/0*H3jZONKqRuAAeHnG.jpg")'
    }
    else{
      this.className = `url(${this.urlFromDto(this.props.dto)})`
    }

     return (
      <div>
        {this.state.isLoaded ?
          <div
            className={`image-root ${this.props.index}`}
            style={{
              display: "flex",
              backgroundImage: `${this.className}`,
              animation:`${this.state.animation}`,
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
                onClick={() => this.props.onDuplicate(this.props.index)}

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
          </div> : this.Spinner()
        }
        {this.state.isOpen === true ?
          <Modal hideModal={this.hideModal} show={this.state.isOpen}>
            <div
              className='diviel'
              style={{
                display: "flex",
                backgroundImage: `url(${this.urlFromDto(this.props.dto)})`,
                backgroundRepeat: 'no-repeat',
                width: '80%',
                height: '80%'
              }}>

            </div>
          </Modal> : null
        }
      </div>
    );
  }
}
export default connect(mapStateToProps)(Image)

