import { createSelector, createSelectorCreator, defaultMemoize } from 'reselect'

const getCards = state => state.cards.data

export const cardsSelector = createSelector(
  [ getCards ],
  data => {
    const nextState = Object.values(data).map(value => Object.assign({}, value))
    return nextState
  }
)