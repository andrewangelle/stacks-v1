import 'whatwg-fetch';
import 'babel-polyfill';
import { createAction } from 'redux-actions';
import * as userApi from '../middleware/user';
import { auth } from '../config/auth';

export const checkUserStatusRequest = createAction('CHECK_USER_STATUS_REQUEST');
export const checkUserStatusSuccess = createAction('CHECK_USER_STATUS_SUCCESS');
export const checkUserStatusFailure = createAction('CHECK_USER_STATUS_FAILURE');
export const loginUserWithGmailRequest = createAction('LOGIN_USER_WITH_GMAIL_REQUEST');
export const loginUserWithGmailSuccess = createAction('LOGIN_USER_WITH_GMAIL_SUCCESS');
export const loginUserWithGmailFailure = createAction('LOGIN_USER_WITH_GMAIL_FAILURE');
export const logoutUserWithGmailRequest = createAction('LOGOUT_USER_WITH_GMAIL_REQUEST');
export const logoutUserWithGmailSuccess = createAction('LOGOUT_USER_WITH_GMAIL_SUCCESS');
export const logoutUserWithGmailFailure = createAction('LOGOUT_USER_WITH_GMAIL_FAILURE');
export const getUserInfoRequest = createAction('GET_USER_INFO_REQUEST');
export const getUserInfoSuccess = createAction('GET_USER_INFO_SUCCESS');
export const getUserInfoFailure = createAction('GET_USER_INFO_FAILURE');
export const checkAccountAvailabilityRequest = createAction('CHECK_ACCOUNT_AVAILABILITY_REQUEST')
export const checkAccountAvailabilitySuccess = createAction('CHECK_ACCOUNT_AVAILABILITY_SUCCESS')
export const checkAccountAvailabilityFailure = createAction('CHECK_ACCOUNT_AVAILABILITY_FAILURE')

export function checkUserStatus() {
    return async dispatch => {
        dispatch(checkUserStatusRequest())
        await auth.onAuthStateChanged(user => {
          if(user){
            dispatch(
                checkUserStatusSuccess({
                    name: user.displayName,
                    email: user.email,
                    uid: user.uid
                })
            )
          } else {
            dispatch(checkUserStatusFailure())
          }
        })
    }
}

export function loginUserWithGmail() {
    return async dispatch => {
        dispatch(loginUserWithGmailRequest());
        try {
            const user = await userApi.loginAuth();
            dispatch(loginUserWithGmailSuccess(user))
        }
        catch(e) {
            console.log(e.message)
        }
    }
}

export function logoutUserWithGmail() {
    return dispatch => {
        dispatch(logoutUserWithGmailRequest())
        auth.signOut()
        .then(() => {
            dispatch(logoutUserWithGmailSuccess())
        })
    }
}

export function checkAccountAvailability(data) {
    return async dispatch => {
        dispatch(checkAccountAvailabilityRequest());
        try {
            const results = await userApi.checkAvailability(data);
            dispatch(checkAccountAvailabilitySuccess(results));
        }
        catch(e) {
            console.log(e.message)
        }
    }
}

export function createAccount() {
    return async dispatch => {
        dispatch(loginUserWithGmailRequest());
        try {
            const user = await userApi.createAccount();
            dispatch(loginUserWithGmailSuccess(user))
        }
        catch(e) {
            console.log(e.message)
        }
    }
}