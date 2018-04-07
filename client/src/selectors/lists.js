import { createSelector } from 'reselect'

const getLists = state => state.lists.data

export const listSelector = createSelector(
  [ getLists ],
  lists => {
    const nextState = Object.values(lists).map(list => Object.assign({}, list))
    return nextState
  }
)