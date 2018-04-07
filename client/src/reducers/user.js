import { handleActions } from 'redux-actions';
import {
    checkUserStatusRequest,
    checkUserStatusSuccess,
    checkUserStatusFailure,
    loginUserWithGmailRequest,
    loginUserWithGmailSuccess,
    loginUserWithGmailFailure,
    logoutUserWithGmailRequest,
    logoutUserWithGmailSuccess,
    logoutUserWithGmailFailure,
} from '../actions/user.js';

const initialState = {
    isLoading: true,
    isLoggedIn: false,
    error: null,
    currentUser: {}
}

export default handleActions({
    [checkUserStatusRequest]: state => ({
        ...state,
        isLoading: true
    }),
    [checkUserStatusSuccess]: (state,action) => ({
        ...state,
        isLoading: false,
        isLoggedIn: true,
        currentUser: action.payload
    }),
    [checkUserStatusFailure]: (state,action) => ({
        ...state,
        isLoading: false,
        isLoggedIn: false,
        error: action.payload
    }),
    [loginUserWithGmailRequest]: state => ({
        ...state,
        isLoading: true
    }),
    [loginUserWithGmailSuccess]: (state,action) => ({
        ...state,
        isLoading: false,
        isLoggedIn: true,
        currentUser: action.payload
    }),
    [loginUserWithGmailFailure]: (state, action) => ({
        ...state,
        isLoading: false,
        isLoggedIn: false,
        error: action.payload
    }),
    [logoutUserWithGmailRequest]: state => ({
        ...state,
        isLoading: true
    }),
    [logoutUserWithGmailSuccess]: state => ({
        ...state,
        isLoading: false,
        isLoggedIn: false,
        currentUser: null
    }),
    [logoutUserWithGmailFailure]: (state,action) => ({
        ...state,
        isLoading: false,
        error: action.payload
    })
}, initialState);