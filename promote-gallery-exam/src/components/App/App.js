import React from 'react';
import './App.scss';
import Gallery from '../Gallery';
import FontAwesome from "react-fontawesome";
import {setScroll} from '../Actions';
import { connect } from 'react-redux';
import {scrollApp} from "../Reducers";

const mapStateToProps = (state) => {
   return {
    isScrolled: state.scrollApp.isScrolled
  }
}

// dispatch the DOM changes to call an action. note mapStateToProps returns object, mapDispatchToProps returns function
// the function returns an object then uses connect to change the data from redecers.
const mapDispatchToProps = (dispatch) => {
    return {
    onScrollChange: (isScrolled) => dispatch(setScroll(!isScrolled))
  }
}
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

  wrappingFunc =(e,func) =>{
    this.insideFunc(e)
    this.debounce(func,500)(e)
  }

  insideFunc = (e) => {
    e.persist()
    if(e.target.id == '1') {
      this.searchText = e.target.value
    }
    else if(e.target.id == '2') {
      this.searchText2 = e.target.value
    }
    else{
      this.handleScroll(e)
    }
  }

   debounce = (func, wait) => {
    let context = this
     return function (...args) {
       clearTimeout(context.timeout)
       context.timeout = setTimeout(() => func.apply(this, args), wait)
     }
   }
   handleChange1 = () => {
     this.setState({tag: this.searchText})
   }
  handleChange2 = () => {
    this.setState({searchBox: this.searchText2})
  }



  handleScroll = (e) => {
    let bottom = e.target.scrollHeight - e.target.scrollTop -400 < e.target.clientHeight;
        if(bottom) {
          this.props.onScrollChange(this.props.isScrolled)
          this.setState({isBottom: true})
        }

    else{
      this.props.onScrollChange(this.props.isScrolled)
      this.setState({isBottom: false})
    }

  }



  render() {
    return (
      <div className="app-root" onScroll={e=>this.wrappingFunc(e,this.handleScroll)}>
        <div className="app-header">
          <h2>Flickr Gallery</h2>
          <div>
          <input id = '1'
                 className="app-input"
                 style={{marginRight:'10px'}}
                 disabled = {(this.state.isFilter)? "disabled" : ""}
                 onChange={e => this.wrappingFunc(e,this.handleChange1)} />
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
              onChange={e => this.wrappingFunc(e,this.handleChange2)} />
            </div>
            : null
          }
        </div>

        <Gallery isBottom={this.state.isBottom} searchBox={this.state.searchBox} tag={this.state.tag}/>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
