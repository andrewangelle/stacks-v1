import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { Route, Router } from 'react-router'
import App from './App';

export default class Root extends Component {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route component={App} />
        </Router>
      </Provider>
    );
  }
}
