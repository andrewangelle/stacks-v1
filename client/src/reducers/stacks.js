import { handleActions } from 'redux-actions';
import {
    getStacksRequest,
    getStacksSuccess,
    getStacksFailure,
    addNewStackSuccess,
    addNewStackFailure,
    deleteStackSuccess,
    deleteStackFailure,
    dragDropSuccess
}  from '../actions/stacks.js';
import { handleDrop } from './helpers';

const initialState = {
    isLoading: true,
    error: null,
    data: {}
};

export default handleActions({
    [getStacksRequest]: state => ({
        ...state,
        isLoading: true
    }),
    [getStacksSuccess]: (state, action) => ({
        ...state,
        isLoading: false,
        data: {
            ...state.data,
            ...action.payload || {}
        }
    }),
    [getStacksFailure]: (state, action) => ({
        ...state,
        isLoading: false,
        error: action.payload
    }),
    [addNewStackSuccess]: (state,action) => ({
      ...state,
      isLoading: false,
      data: {
        ...state.data,
        [action.payload.id]: {
            id: action.payload.id,
            name: action.payload.name,
            parent: action.payload.parent,
            author: action.payload.author
        }
      }
    }),
    [addNewStackFailure]: (state,action) => ({
        ...state,
        error: action.payload
    }),
    [deleteStackSuccess]: (state, action) => ({
        ...state,
        data: Object.values(state.data)
            .map(stack => Object.assign({}, stack))
            .filter(stack => stack.id !== action.payload)
    }),
    [deleteStackFailure]: (state,action) => ({
        ...state,
        error: action.payload
    }),
    [dragDropSuccess]: (state, action) => {
        const prevOrder = Object.values(state.data).map(stack => Object.assign({}, stack));
        const nextState = handleDrop(prevOrder, action.payload);
        return {
            ...state,
            data: {...nextState}
        }
    }
}, initialState);
