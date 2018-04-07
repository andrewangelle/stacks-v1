import { handleActions } from 'redux-actions';
import {
  getTableDataRequest,
  getTableDataSuccess,
  getTableDataFailure,
  updateFilter
} from '../actions/posts';

const initialState = {
  loading: null,
  error: null,
  data: {},
  filters: {
    current: 'none',
    type: 'none',
    data: []
  }
}
/**
  for each:
  @param {object} state - the current state object
  @param {object} action - the payload object fired by the corresponding action function
  @returns {object} - returns a copy of the updated state
*/
export default handleActions({
  [getTableDataRequest]: (state, action) => ({
    ...state,
    loading: true,
  }),
  [getTableDataSuccess]: (state, action) => ({
    ...state,
    loading: false,
    data: {
      ...state.data,
      ...action.payload || {}
    }
  }),
  [getTableDataFailure]: (state, action) => ({
    ...state,
    error: action.payload,
    loading: false
  }),
  [updateFilter]: (state, action) => {
    /**
      edge cases that return numbers as a string
    */
    if(action.payload.type === 'userId'){
      return {
        ...state,
        filters: {
          ...state.filters,
          type: action.payload.type,
          //eslint-disable-next-line
          current: parseInt(action.payload.value)
        }
      }
    }
    if(action.payload.type === 'id') {
      return {
        ...state,
        filters: {
          ...state.filters,
          type: action.payload.type,
          //eslint-disable-next-line
          current: parseInt(action.payload.value)
        }
      }
    }

    return {
      ...state,
      filters: {
        ...state.filters,
        type: action.payload.type,
        current: action.payload.value
      }
    }
  }
}, initialState);