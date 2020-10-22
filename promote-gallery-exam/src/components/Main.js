require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import App from './App';
import './App/App.scss'

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index" >
        <App/>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
