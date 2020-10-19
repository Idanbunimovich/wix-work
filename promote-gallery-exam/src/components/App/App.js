import React from 'react';
import './App.scss';
import Gallery from '../Gallery';
import LazyLoad from "react-lazyload";

class App extends React.Component {
  static propTypes = {
  };
  constructor() {
    super();
    this.searchText = '';
    this.searchText2 = '';
    this.timeout =  0;
    this.state = {
      isBottom:false,
      tag: 'art'
    };

  }



  Spinner = () => {
    console.log("success")
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


  debounce = (e) => {
    e.persist()
    if(e.target.id == '1')
    this.searchText = e.target.value
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
      }, 500);
  }
  handleScroll = (e) => {
    let bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if(bottom){
      this.setState({isBottom: true},() => console.log(this.state.isBottom + " bottom"))
    }
    else{
      console.log(e.target.scrollHeight - e.target.scrollTop);
      console.log(e.target.clientHeight)
      this.setState({isBottom: false},() => console.log(this.state.isBottom + " not bottom"))
    }

  }



  render() {
    return (
      <div className="app-root" id = '2' onScroll={e=>this.debounce(e)}>
        <div className="app-header">
          <h2>Flickr Gallery</h2>
          <input id = '1' className="app-input" style={{marginRight:'10px'}}onClick={this.filterImage}  onChange={e => this.debounce(e)} />
        </div>
        <LazyLoad placeholder={this.Spinner()}>
        <Gallery isBottom={this.state.isBottom} tag={this.state.tag}/>
        </LazyLoad>
      </div>
    );
  }
}

export default App;
