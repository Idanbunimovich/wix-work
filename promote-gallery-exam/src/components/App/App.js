import React from 'react';
import './App.scss';
import Gallery from '../Gallery';
import FontAwesome from "react-fontawesome";

class App extends React.Component {
  static propTypes = {
  };
  constructor() {
    super();
    this.searchText = '';
    this.searchText2 = '';
    this.timeout =  0;
    this.state = {
      isScrolled:false,
      isBottom:false,
      tag: 'art',
      searchBox:'',
      isFilter:false,
      className:'image-icon'
    };

  }

  filterImages = () => {
    if(this.state.isFilter) {
      this.setState({isFilter:false})
      this.setState({className: 'image-icon'})
    }
    else {
      this.setState({isFilter:true})
      this.setState({className: 'image-icon2'})
    }
  }

  debounce = (e) => {
    e.persist()
    if(e.target.id == '1') {
      this.searchText = e.target.value
    }
    else if(e.target.id == '2') {
      this.searchText2 = e.target.value
    }
    else{
       this.handleScroll(e);

    }
    if(this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      if(e.target.id == '1'){
        this.setState({tag: this.searchText})
      }
      else if(e.target.id == '2'){
        this.setState({searchBox: this.searchText2})
      }

      }, 500);
  }
  handleScroll = (e) => {
    let bottom = e.target.scrollHeight - e.target.scrollTop -400 < e.target.clientHeight;
        if(bottom) {
          this.setState({isScrolled:(!this.state.isScrolled)})
          this.setState({isBottom: true})
        }

    else{
      this.setState({isScrolled:(!this.state.isScrolled)})
      this.setState({isBottom: false})
    }

  }



  render() {
    return (
      <div className="app-root" onScroll={e=>this.debounce(e)}>
        <div className="app-header">
          <h2>Flickr Gallery</h2>
          <div>
          <input id = '1'
                 className="app-input"
                 style={{marginRight:'10px'}}
                 disabled = {(this.state.isFilter)? "disabled" : ""}
                 onChange={e => this.debounce(e)} />
            <FontAwesome
              className={this.state.className}
              name="filter"
              title="filter"
              onClick={this.filterImages}
            />
          </div>
          {this.state.isFilter===true?
            <div>
            <p>search existing photos</p>
            <input
              id = '2'
              className="app-input2"
              onChange={e => this.debounce(e)} />
            </div>
            : null
          }
        </div>

        <Gallery isScrolled={this.state.isScrolled} isBottom={this.state.isBottom} searchBox={this.state.searchBox} tag={this.state.tag}/>

      </div>
    );
  }
}

export default App;
