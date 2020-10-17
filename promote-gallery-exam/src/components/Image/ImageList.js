import React from 'react';
import Image from "./Image";
import "./Image.scss"


class ImageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      duplicate : [1]
    }
  }
  getImages = () => {
    const {key,dto,galleryWidth} = this.props
    return this.state.duplicate.map(() => {
      return (

        <Image
          key={key}
          dto={dto}
          galleryWidth={galleryWidth}
          onDuplicate={this.props.onDuplicate}
        />


      );
    })

  }
  onDuplicate = () => {

    this.setState({duplicate : (this.state.duplicate.concat(1))})
  }
  render() {

    return (
      <div className="fragment">
        {this.getImages()}
      </div>

    );
  }
}
export default ImageList;
