import 'whatwg-fetch';
import 'babel-polyfill';
import { createAction } from 'redux-actions';
import * as projectsApi from '../middleware/projects';

export const getProjectsRequest = createAction('GET_PROJECTS_REQUEST');
export const getProjectsSuccess = createAction('GET_PROJECTS_SUCCESS');
export const getProjectsFailure = createAction('GET_PROJECTS_FAILURE');
export const addNewProjectRequest = createAction('ADD_NEW_PROJECT_REQUEST');
export const addNewProjectSuccess = createAction('ADD_NEW_PROJECT_SUCCESS');
export const addNewProjectFailure = createAction('ADD_NEW_PROJECT_FAILURE');
export const deleteProjectRequest = createAction('DELETE_PROJECT_REQUEST');
export const deleteProjectSuccess = createAction('DELETE_PROJECT_SUCCESS');
export const deleteProjectFailure = createAction('DELETE_PROJECT_FAILURE');
export const reorderDndProjects = createAction('DRAG_DROP_PROJECT_SUCCESS');

export function getProjects(userId) {
    return async dispatch => {
        dispatch(getProjectsRequest());
        try {
            const projects = await projectsApi.fetchProjectsData(userId);
            dispatch(getProjectsSuccess(projects));
        }
        catch(e){
            getProjectsFailure(e.message);
        }
    }
}

export function addNewProject(data) {
    return async dispatch => {
        dispatch(addNewProjectSuccess(data));
        try {
            await projectsApi.postProject(data);
        }
        catch(e){
            dispatch(addNewProjectFailure(e.message));
        }
    }
}

export function deleteProject(id) {
    return async dispatch => {
        dispatch(deleteProjectSuccess(id));
        try {
            await projectsApi.deleteProject(id);
        }
        catch(e) {
            dispatch(deleteProjectFailure(e.message));
        }
    }
}

export function dragEnd(data) {
    return async dispatch => {
        const results = projectsApi.normalizeAfterDnd(data)
        dispatch(reorderDndProjects(results));
    }
}