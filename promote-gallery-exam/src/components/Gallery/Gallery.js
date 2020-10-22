import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './Gallery.scss';
import Image from "../Image";

class Gallery extends React.Component {
  static propTypes = {
    tag: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.images = [];
    this.state = {
      images: [],
      galleryWidth: this.getGalleryWidth(),
      page : 1,
      total: 0
    };
  }


  getGalleryWidth(){
    try {
      return document.body.clientWidth;
    } catch (e) {
      return 1000;
    }
  }
  getImages(tag,page) {
    const getImagesUrl = `services/rest/?method=flickr.photos.search&api_key=522c1f9009ca3609bcbaf08545f067ad&tags=${tag}&tag_mode=any&extras=description&per_page=100&page=${page}&format=json&safe_search=1&nojsoncallback=1`;
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
          if(this.state.images.length !== 0) {
            this.images =[...this.images, ...res.photos.photo]
            this.setState(prevState => ({
              images: [...prevState.images, ...res.photos.photo]
            }));
            this.setState({total: res.photos.total})
          }
          else{
            this.images = [...res.photos.photo]
            this.setState({images:this.images})
            this.setState({total:res.photos.total})

          }
        }
      }).catch(err=>console.log(err));
  }


  componentDidMount() {
    const {page} = this.state
    this.getImages(this.props.tag,page.toString());
    this.setState({
      galleryWidth: document.body.clientWidth
    });
  }


  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevState.page < this.state.page) {
      if(this.state.images.length < this.state.total)
        this.getImages(this.props.tag, this.state.page.toString());
    }

    if(prevProps.tag!==this.props.tag){
      let props;
      if(this.props.tag === ''){
        props = 'art'
      }
      else{
        props = this.props.tag;
        this.setState({page:1})
      }
      this.setState({images:[]},() => this.getImages(props,this.state.page.toString()))
    }

    if(prevProps.searchBox!==this.props.searchBox){
      if(this.props.searchBox === ''){
        this.setState({images:this.images})
      }
      else{
        let filteredImages = this.images.filter(image =>{

          return (image.title.toLowerCase().includes(this.props.searchBox.toLowerCase())||image.description._content.toLowerCase().includes(this.props.searchBox.toLowerCase()))
        })
        this.setState({images:filteredImages})
      }
    }

    if((prevProps.isBottom !== this.props.isBottom)&&(this.props.isBottom === true)){
      this.nextPage();
    }
  }


  nextPage = () => {
    this.setState({page:(this.state.page+1)})
  }


  onDuplicate =(index) =>{
    let arr = [...this.state.images]
     arr.splice(index,0,this.state.images[index])
      this.setState({images: arr})
  }

  showGallery = () => {
    return (<div className='gallery-root'>
      {this.state.images.map((dto,index) => {
        return <Image key={index}
                      isScrolled={this.props.isScrolled}
                      keys={'image-' + dto.id} page={this.state.page}
                      onDuplicate = {this.onDuplicate}
                      index = {index}
                      dto={dto}
                      galleryWidth={this.state.galleryWidth}
        />;
      })}
    </div>
    );
  }

  render() {

    return (
      <div className="gallery-wrapper" style={{height:'100%'}} >
        {this.showGallery()}
      </div>
    );
  }
}

export default Gallery;




