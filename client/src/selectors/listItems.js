import { createSelector } from 'reselect'

const getItems = state => state.listItems.data;

export const listItemSelector = createSelector(
  [ getItems ],
  data => {
    const nextState = Object.values(data).map(value => Object.assign({}, value))
    return nextState
  }
)