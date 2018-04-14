import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { Route } from 'react-router';
import { Router } from 'react-router-dom';
import App from './App';

class Root extends Component {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <Router basename='/' history={history}>
          <Route path="/" component={App} />
        </Router>
      </Provider>
    );
  }
}

export default Root