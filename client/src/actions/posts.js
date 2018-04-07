import { createAction } from 'redux-actions';
import * as postsApi from '../middleware/posts';

export const getTableDataRequest = createAction('GET_TABLE_DATA_REQUEST');
export const getTableDataSuccess = createAction('GET_TABLE_DATA_SUCCESS');
export const getTableDataFailure = createAction('GET_TABLE_DATA_FAILURE');
export const updateFilter = createAction('UPDATE_FILTER');
export const clearAllFilters = createAction('CLEAR_ALL_FILTERS');

export function getTableData() {
  return async dispatch => {
    dispatch(getTableDataRequest());
    try {
      const data = await postsApi.fetchTableData();
      dispatch(getTableDataSuccess(data));
    }
    catch(e) {
      dispatch(getTableDataFailure());
    }
  }
}

export function setFilter(payload) {
  return dispatch => {
    dispatch(updateFilter(payload))
  }
}