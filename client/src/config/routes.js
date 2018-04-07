import React from 'react';
import { Route, Switch } from 'react-router';
import HomePage from '../containers/HomePage'
import StacksPage from '../containers/StacksPage';
import CardPage from '../containers/CardPage';
import NotFoundPage from '../containers/NotFoundPage';

export default (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/stacks/:projectId" component={StacksPage} />
    <Route exact path="/card/:cardId/" component={CardPage} />
    <Route component={NotFoundPage} />
  </Switch>
);