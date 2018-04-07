import { createSelector, createSelectorCreator, defaultMemoize } from 'reselect'

const getStacks = state => state.stacks.data

export const stacksSelector = createSelector(
  [ getStacks ],
  data => {
    const nextState = Object.values(data).map(value => Object.assign({}, value))
    return nextState
  }
)