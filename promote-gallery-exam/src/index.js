import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import {scrollApp} from "./components/Reducers";

const logger = createLogger()

const rootReducers = combineReducers({scrollApp})

const store = createStore(rootReducers, applyMiddleware(thunkMiddleware, logger))

// Render the main component into the dom
ReactDOM.render(<Provider store={store}>
  <App/>
</Provider>, document.getElementById('app'));
