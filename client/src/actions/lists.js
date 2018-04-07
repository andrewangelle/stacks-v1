import { createAction } from 'redux-actions';
import * as listsApi from '../middleware/lists';
import * as activityApi from '../middleware/activity';

export const getListsRequest = createAction('GET_LISTS_REQUEST');
export const getListsSuccess = createAction('GET_LISTS_SUCCESS');
export const getListsFailure = createAction('GET_LISTS_FAILURE');
export const addNewListRequest = createAction('ADD_NEW_LIST_REQUEST');
export const addNewListSuccess = createAction('ADD_NEW_LIST_SUCCESS');
export const addNewListFailure = createAction('ADD_NEW_LIST_FAILURE');
export const addListActivityRequest = createAction('ADD_LIST_ACTIVITY_REQUEST');
export const addListActivitySuccess = createAction('ADD_LIST_ACTIVITY_SUCCESS');
export const deleteListRequest = createAction('DELETE_LIST_REQUEST');
export const deleteListSuccess = createAction('DELETE_LIST_SUCCESS');
export const deleteListFailure = createAction('DELETE_LIST_FAILURE');
export const dragDropSuccess = createAction('DRAG_DROP_SUCCESS');

export function getLists(data) {
    return async dispatch => {
        dispatch(getListsRequest());
        try {
            const lists = await listsApi.fetchListsData(data);
            dispatch(getListsSuccess(lists));
        }
        catch(e) {
            dispatch(getListsFailure(e.message))
        }
    }
}

export function addNewList(data) {
    return async dispatch => {
        dispatch(addNewListSuccess(data));
        dispatch(addListActivityRequest())
        try {
            const activity = await activityApi.addListActivity(data);
            dispatch(addListActivitySuccess(activity))

            await listsApi.postList(data);
        }
        catch(e) {
            dispatch(addNewListFailure(e.message));
        }
    }
}

export function deleteList(data) {
    return async dispatch => {
        dispatch(deleteListSuccess(data));
        try {
            await listsApi.deleteList(data);
        }
        catch(e) {
            dispatch(deleteListFailure(e.message));
        }
    }
}

export function dragEnd(data) {
    return async dispatch => {
        const results = listsApi.normalizeAfterDnd(data)
        dispatch(dragDropSuccess(results));

    }
}