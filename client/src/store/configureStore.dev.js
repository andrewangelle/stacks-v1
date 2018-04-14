import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

export const history = createBrowserHistory();
const router = routerMiddleware(history);
const logger = createLogger({collapsed: true});

export function configureStore(initialState){
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, router, logger)
  )
};