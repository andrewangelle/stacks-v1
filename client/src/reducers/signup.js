import { handleActions } from 'redux-actions';
import {
  checkAccountAvailabilityRequest,
  checkAccountAvailabilitySuccess
 } from '../actions/user';


const initialState = {
  isLoading: null,
  data: {},
  checkSuccessful: false
};

export default handleActions({
  [checkAccountAvailabilityRequest]: state => ({
    ...state,
    isLoading: true
  }),
  [checkAccountAvailabilitySuccess]: (state,action) => ({
      ...state,
      data: action.payload[0],
      checkSuccessful: true
  })
}, initialState);