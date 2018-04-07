import { createAction } from 'redux-actions';
import * as activityApi from '../middleware/activity';

export const getActivityRequest = createAction('GET_ACTIVITY_REQUEST');
export const getActivitySuccess = createAction('GET_ACTIVITY_SUCCESS');
export const getActivityFailure = createAction('GET_ACTIVITY_FAILURE');

export function getActivity(cardId) {
  return async dispatch => {
    dispatch(getActivityRequest());
    try {
      const data = await activityApi.fetchActivityData(cardId);
      dispatch(getActivitySuccess(data));
    }
    catch(e) {
      dispatch(getActivityFailure(e.message));
    }
  }
}

