import { handleActions } from 'redux-actions';
import {
    getProjectsRequest,
    getProjectsSuccess,
    getProjectsFailure,
    addNewProjectSuccess,
    addNewProjectFailure,
    deleteProjectSuccess,
    deleteProjectFailure,
    dragDropSuccess
} from '../actions/projects';
import { handleDrop } from './helpers';

const initialState = {
    isLoading: false,
    error: null,
    data: {},
    activity: {}
};

export default handleActions({
    [getProjectsRequest]: state => ({
        ...state,
        isLoading: true
    }),
    [getProjectsSuccess]: (state,action) => ({
        ...state,
        isLoading: false,
        data: {
            ...state.data,
            ...action.payload || {}
        }
    }),
    [getProjectsFailure]: (state,action) => ({
        ...state,
        isLoading: false,
        error: action.payload
    }),
    [addNewProjectSuccess]: (state,action) => ({
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
    [addNewProjectFailure]: (state,action) => ({
        ...state,
        error: action.payload
    }),
    [deleteProjectSuccess]: (state, action) => ({
        ...state,
        isLoading: false,
        data: Object.values(state.data)
            .map(project => Object.assign({}, project))
            .filter(project => project.id !== action.payload)
    }),
    [deleteProjectFailure]: (state,action) => ({
        ...state,
        error: action.payload
    }),
    [dragDropSuccess]: (state, action) => {
        const prevOrder = Object.values(state.data).map(project => Object.assign({}, project));
        const nextState = handleDrop(prevOrder, action.payload);
        return {
            ...state,
            data: {...nextState}
        }
    }
}, initialState);