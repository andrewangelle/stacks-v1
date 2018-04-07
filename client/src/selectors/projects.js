import { createSelector, createSelectorCreator, defaultMemoize } from 'reselect'

const getProjects = state => state.projects.data

export const projectsSelector = createSelector(
  [ getProjects ],
  data => {
    const nextState = Object.values(data).map(value => Object.assign({}, value))
    return nextState
  }
)