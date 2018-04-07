import { handleActions } from 'redux-actions';
import { getStacksSuccess, addNewStackSuccess, deleteStackSuccess, reorderDndStacks } from '../actions/stacks'

const initialState = {
  projects: {},
  stacks: {},
  lists: {}
};

export default handleActions({
  [getStacksSuccess] : (state, action) => ({
    ...state,
    stacks: action.payload || {}
  }),
  [addNewStackSuccess]: (state,action) => ({
    ...state,
    stacks: {
      ...state.stacks,
      [action.payload.id]: {
          id: action.payload.id,
          name: action.payload.name,
          parent: action.payload.parent,
          author: action.payload.author
      }
    }
  }),
  [deleteStackSuccess]: (state,action) => {
    return {
      ...state,
      stacks: Object.values(state.stacks)
      .map(stack => Object.assign({}, stack))
      .filter(stack => stack.id !== action.payload)
    }
  },
  [reorderDndStacks]: (state, action) => {
    return {
      ...state,
      stacks: {...action.payload}
    }
  }
}, initialState)
