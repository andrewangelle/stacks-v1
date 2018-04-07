import { handleActions } from 'redux-actions';
import {
    getListsRequest,
    getListsSuccess,
    getListsFailure,
    addNewListSuccess,
    addNewListFailure,
    deleteListSuccess,
    deleteListFailure,
    dragDropSuccess
}  from '../actions/lists.js';

const initialState = {
    isLoading: true,
    error: null,
    data: {}
};

export default handleActions({
    [getListsRequest]: (state,action) => ({
        ...state,
        isLoading:true
    }),
    [getListsSuccess]: (state, action) => ({
        ...state,
        isLoading: false,
        data: {
            ...state.data,
            ...action.payload || {}
        }
    }),
    [getListsFailure]: (state,action) => ({
        ...state,
        error: action.payload
    }),
    [addNewListSuccess]: (state,action) => ({
      ...state,
      isLoading: false,
      data: {
        ...state.data,
        [action.payload.list.id]: {
            id: action.payload.list.id,
            name: action.payload.list.name,
            parent: action.payload.list.parent,
            author: action.payload.list.author
        } || {}
      }
    }),
    [addNewListFailure]: (state,action) => ({
        ...state,
        error: action.payload
    }),
    [deleteListSuccess]: (state, action) => ({
        ...state,
        isLoading: false,
        data: Object.values(state.data)
            .map(list => Object.assign({}, list))
            .filter(list => list.id !== action.payload)
    }),
    [deleteListFailure]: (state,action) => ({
        ...state,
        error: action.payload
    }),
    [dragDropSuccess]: (state, action) => ({
        ...state,
        data: {
            ...action.payload || {}
        }
    })
}, initialState);