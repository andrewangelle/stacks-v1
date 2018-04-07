import { createAction } from 'redux-actions';
import * as listItemsApi from '../middleware/listItems';

export const getListItemsRequest = createAction('GET_LIST_ITEMS_REQUEST');
export const getListItemsSuccess = createAction('GET_LIST_ITEMS_SUCCESS');
export const getListItemsFailure = createAction('GET_LIST_ITEMS_FAILURE');
export const addNewListItemRequest = createAction('ADD_NEW_LIST_ITEM_REQUEST');
export const addNewListItemSuccess = createAction('ADD_NEW_LIST_ITEM_SUCCESS');
export const addNewListItemFailure = createAction('ADD_NEW_LIST_ITEM_FAILURE');
export const updateItemStatusRequest = createAction('UPDATE_ITEM_STATUS_REQUEST');
export const updateItemStatusSuccess = createAction('UPDATE_ITEM_STATUS_SUCCESS');
export const updateItemStatusFailure = createAction('UPDATE_ITEM_STATUS_FAILURE');

export function getListItems(data) {
  return async dispatch => {
    dispatch(getListItemsRequest());
    try {
      const listItems = await listItemsApi.fetchListItemsData(data);
      dispatch(getListItemsSuccess(listItems));
    }
    catch(e){
      getListItemsFailure(e.message);
    }
  }
}

export function addNewListItem(data) {
  return async dispatch => {
    dispatch(addNewListItemSuccess(data));
    try {
      await listItemsApi.postListItem(data);

    }
    catch(e){
      dispatch(addNewListItemFailure(e.message));
    }
  }
}

export function updateListItem(data) {
  return async dispatch => {
      dispatch(updateItemStatusSuccess(data));
    try{
      await listItemsApi.putListItem(data);
    }
    catch(e){
      dispatch(updateItemStatusFailure(e.message));
    }
  }
}
