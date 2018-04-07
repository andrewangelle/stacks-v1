import 'whatwg-fetch';
import 'babel-polyfill';
import { createAction } from 'redux-actions';
import * as stacksApi from '../middleware/stacks';

export const getStacksRequest = createAction('GET_STACKS_REQUEST');
export const getStacksSuccess = createAction('GET_STACKS_SUCCESS');
export const getStacksFailure = createAction('GET_STACKS_FAILURE');
export const addNewStackRequest = createAction('ADD_NEW_STACK_REQUEST');
export const addNewStackSuccess = createAction('ADD_NEW_STACK_SUCCESS');
export const addNewStackFailure = createAction('ADD_NEW_STACK_FAILURE');
export const deleteStackRequest = createAction('DELETE_STACK_REQUEST');
export const deleteStackSuccess = createAction('DELETE_STACKS_SUCCESS');
export const deleteStackFailure = createAction('DELETE_STACKS_FAILURE');
export const reorderDndStacks = createAction('DRAG_DROP_STACK_SUCCESS');

export function getStacks(data){
    return async dispatch => {
        dispatch(getStacksRequest());
        try {
            const stacks = await stacksApi.fetchStacksData(data);
            dispatch(getStacksSuccess(stacks));
        }
        catch(e) {
            dispatch(getStacksFailure(e.message));
        }
    }
}

export function addNewStack(data) {
    return async dispatch => {
        dispatch(addNewStackSuccess(data));
        try {
            await stacksApi.postStack(data);
        }
        catch(e) {
            dispatch(addNewStackFailure(e.message));
        }
    }
}

export function deleteStack(data) {
    return async dispatch => {
        dispatch(deleteStackRequest());
        try {
            await stacksApi.deleteStack(data);
            dispatch(deleteStackSuccess(data));
        }
        catch(e) {
            dispatch(deleteStackFailure(e.message));
        }
    }
}

export function dragEnd(data) {
    return async dispatch => {
        const results = stacksApi.normalizeAfterDnd(data)
        dispatch(reorderDndStacks(results));
    }
}