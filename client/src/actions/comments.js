import { createAction } from 'redux-actions';
import * as commentsApi from '../middleware/comments';
import * as activityApi from '../middleware/activity';

export const getCommentsRequest = createAction('GET_COMMENTS_REQUEST');
export const getCommentsSuccess = createAction('GET_COMMENTS_SUCCESS');
export const getCommentsFailure = createAction('GET_COMMENTS_FAILURE');
export const addNewCommentRequest = createAction('ADD_NEW_COMMENT_REQUEST');
export const addNewCommentSuccess = createAction('ADD_NEW_COMMENT_SUCCESS');
export const addNewCommentFailure = createAction('ADD_NEW_COMMENT_FAILURE');
export const addNewReplyRequest = createAction('ADD_NEW_REPLY_REQUEST');
export const addNewReplySuccess = createAction('ADD_NEW_REPLY_SUCCESS');
export const addNewReplyFailure = createAction('ADD_NEW_REPLY_FAILURE');
export const addCommentActivityRequest = createAction('ADD_COMMENT_ACTIVITY_REQUEST');
export const addCommentActivitySuccess = createAction('ADD_COMMENT_ACTIVITY_SUCCESS');
export const deleteCommentRequest = createAction('DELETE_COMMENT_REQUEST');
export const deleteCommentSuccess = createAction('DELETE_COMMENT_SUCCESS');
export const deleteCommentFailure = createAction('DELETE_COMMENT_FAILURE');
export const setRepliesVisiblityFilter = createAction('SET_REPLIES_VISBILITY_FILTER');

export function getComments(data) {
    return async dispatch => {
        dispatch(getCommentsRequest());
        try {
            const comments = await commentsApi.fetchCommentsData(data);
            dispatch(getCommentsSuccess(comments));
        }
        catch(e) {
            dispatch(getCommentsFailure(e.message))
        }
    }
}

export function addNewComment(data) {
    return async dispatch => {
        dispatch(addNewCommentSuccess(data));
        try {
            const activity = await activityApi.postCommentActivity(data)
            dispatch(addCommentActivitySuccess(activity))

            await commentsApi.postComment(data);
        }
        catch(e) {
            console.log(e.message)
        }
    }
}

export function deleteComment(data) {
    return async dispatch => {
        dispatch(deleteCommentSuccess(data));
        try {
            await commentsApi.deleteComment(data);
        }
        catch(e) {
            dispatch(deleteCommentFailure(e.message));
        }
    }
}

export function addNewReply(data) {
  return async dispatch => {
    dispatch(addNewCommentSuccess(data));
    try{
        const activity = await activityApi.postReplyActivity(data);
        dispatch(addCommentActivitySuccess(activity));

        await commentsApi.postReply(data)
    }
    catch(e) {
        console.log(e.message)
    }
  }
}

export function setRepliesVisiblity(replies) {
    return dispatch => {
        dispatch(setRepliesVisiblityFilter(replies));
    }
}