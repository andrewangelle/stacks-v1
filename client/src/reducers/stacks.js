import { handleActions } from 'redux-actions';
import {
    getStacksRequest,
    getStacksSuccess,
    getStacksFailure,
    addNewStackSuccess,
    addNewStackFailure,
    deleteStackSuccess,
    deleteStackFailure,
    reorderDndStacks
}  from '../actions/stacks.js';

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
    [reorderDndStacks]: (state, action) => {
        return {
            ...state,
            stacks: {...action.payload}
        }
    }
}, initialState);
