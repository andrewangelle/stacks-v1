import { handleActions } from 'redux-actions';
import {
  getListItemsRequest,
  getListItemsSuccess,
  getListItemsFailure,
  addNewListItemSuccess,
  addNewListItemFailure,
  updateItemStatusSuccess,
  updateItemStatusFailure
}  from '../actions/listItems.js';

const initialState = {
    isLoading: true,
    error: null,
    data: {},
    activity: {}
};

export default handleActions({
  [getListItemsRequest]: state => ({
      ...state,
      isLoading:true
  }),
  [getListItemsSuccess]: (state, action) => ({
      ...state,
      isLoading: false,
      data: {
        ...state.data,
        ...action.payload || {}
      }
  }),
  [getListItemsFailure]: (state,action) => ({
      ...state,
      error: action.payload
  }),
  [addNewListItemSuccess]: (state,action) => ({
    ...state,
    isLoading: false,
    data: {
      ...state.data,
      [action.payload.id]: {
          id: action.payload.id,
          data: action.payload.data,
          completed: false,
          parent: action.payload.parent,
          author: action.payload.author
      }
    }
  }),
  [addNewListItemFailure]: state => ({
      ...state,
      isLoading: false,
      error: true
  }),
  [updateItemStatusSuccess]: (state,action) => ({
    ...state,
    isLoading: false,
    data: {
      ...state.data,
      [action.payload]: {
        ...state.data[action.payload],
        completed: !state.data[action.payload].completed
      }
    }
  }),
  [updateItemStatusFailure]: (state,action) => ({
    ...state,
    error: action.payload
  })
}, initialState)