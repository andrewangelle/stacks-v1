import { handleActions } from 'redux-actions';
import {
    getCommentsRequest,
    getCommentsSuccess,
    getCommentsFailure,
    addNewCommentSuccess,
    addNewCommentFailure,
    addNewReplyFailure,
    deleteCommentSuccess,
    deleteCommentFailure
}  from '../actions/comments.js';

const initialState = {
    isLoading: true,
    error: null,
    data: {}
};

export default handleActions({
  [getCommentsRequest]: state => ({
      ...state,
      isLoading:true
  }),
  [getCommentsSuccess]: (state, action) => ({
    ...state,
    isLoading: false,
    data: {
      ...action.payload || {}
    }
  }),
  [getCommentsFailure]: (state,action) => ({
      ...state,
      isLoading: false,
      error: action.payload
  }),
  [addNewCommentSuccess]: (state,action) => {
    const model = {
      id: action.payload.comment.id,
      data: action.payload.comment.data,
      parent: action.payload.comment.parent,
      author: action.payload.comment.author,
      isReply: action.payload.comment.isReply,
      originId: action.payload.comment.originId,
      created: action.payload.comment.created
    }

    const nextState = {
      ...state,
      data: {
        ...state.data,
        [model.id]: {
          ...model
        }
      }
    }

    return {...nextState}
  },
  [addNewCommentFailure]: (state,action) => ({
      ...state,
      isLoading: false,
      error: action.payload
  }),
  [addNewReplyFailure]: (state,action) => ({
      ...state,
      isLoading: false,
      error: action.payload
  }),
  [deleteCommentSuccess]: (state, action) => ({
      ...state,
      isLoading: false,
      data: Object.values(state.data)
        .map(comment => Object.assign({}, comment))
        .filter(comment => comment.id !== action.payload.id)
  }),
  [deleteCommentFailure]: (state,action) => ({
      ...state,
      error: action.payload
  })
}, initialState);