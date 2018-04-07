import { handleActions } from 'redux-actions';
import {
    getProjectsRequest,
    getProjectsSuccess,
    getProjectsFailure,
    addNewProjectSuccess,
    addNewProjectFailure,
    deleteProjectSuccess,
    deleteProjectFailure,
    reorderDndProjects,
} from '../actions/projects';

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
    [reorderDndProjects]: (state,action) => ({
        ...state,
        data: {...action.payload}
    })
}, initialState);