import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import configureStore from './store/configureStore.js';
import createHistory from 'history/createBrowserHistory';
import 'bootstrap/dist/css/bootstrap.css';

const store = configureStore();
const history = createHistory();

ReactDOM.render(
  <Root store={store} history={history} />,
  document.getElementById('root')
);
