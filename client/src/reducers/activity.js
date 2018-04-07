import { handleActions } from 'redux-actions';
/**
  stuff we track activity of
*/
import { getActivityRequest, getActivityFailure, getActivitySuccess } from '../actions/activity';
import { addCommentActivitySuccess } from '../actions/comments';
import { addListActivitySuccess } from '../actions/lists';

const initialState = {
  isLoading: null,
  error: null,
  data: []
};

export default handleActions({
  [getActivityRequest]: state => ({
    ...state,
    isLoading: true
  }),
  [getActivitySuccess]: (state,action) => ({
    ...state,
    isLoading: false,
    data: action.payload || {}
  }),
  [getActivityFailure]: (state, action) => ({
    ...state,
    error: action.payload
  }),
  [addCommentActivitySuccess]: (state,action) =>({
      ...state,
      data: [
        ...state.data,
        action.payload[0]
      ]
  }),
  [addListActivitySuccess]: (state,action) => ({
    ...state,
    data: [
      ...state.data,
      {...action.payload}

    ]
  })
}, initialState);