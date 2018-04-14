import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import stacks from './stacks';
import cards from './cards';
import users from './user';
import lists from './lists';
import listItems from './listItems';
import comments from './comments';
import projects from './projects';
import activity from './activity';
import signup from './signup';

const rootReducer = combineReducers({
  activity,
  stacks,
  cards,
  projects,
  users,
  signup,
  lists,
  listItems,
  comments,
  router
});

export default rootReducer;
