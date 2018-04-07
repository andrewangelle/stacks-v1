import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import stacks from './stacks';
import cards from './cards';
import users from './user';
import lists from './lists';
import listItems from './listItems';
import comments from './comments';
import projects from './projects';
import activity from './activity';
import signup from './signup';
import dnd from './dnd';

const rootReducer = combineReducers({
  dnd,
  activity,
  stacks,
  cards,
  projects,
  users,
  signup,
  lists,
  listItems,
  comments,
  routing
});

export default rootReducer;
