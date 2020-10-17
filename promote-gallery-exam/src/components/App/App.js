import React from 'react';
import './App.scss';
import Gallery from '../Gallery';

class App extends React.Component {
  static propTypes = {
  };

  searchText = '';
  timeout =  0;
  state = {
    tag: 'art'
  };

  debounce = (e) => {
    this.searchText = e.target.value  // this is the search text
    if(this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.setState({tag: this.searchText})
    }, 500);
  }



  render() {
    return (
      <div className="app-root">
        <div className="app-header">
          <h2>Flickr Gallery</h2>
          <input className="app-input" onClick={this.filterImage} onChange={e => this.debounce(e)} />
        </div>
        <Gallery tag={this.state.tag}/>
      </div>
    );
  }
}

export default App;
