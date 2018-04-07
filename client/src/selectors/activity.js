import { createSelector } from 'reselect'

const getActivity = state => state.activity.data

export const activitySelector = createSelector(
  [ getActivity ],
  data => {
    const nextState = Object.values(data).map(value => Object.assign({}, value))
    return nextState
  }
)