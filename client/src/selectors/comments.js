import { createSelector } from 'reselect'
import { nestReplies } from '../utils/helpers'

const getComments = state => state.comments.data

export const commentsSelector = createSelector(
  [ getComments ],
  comments => {
    const nextState = Object.values(comments).map(comment => Object.assign({}, comment))
    return nextState
  }
)

export const nestedSelector = createSelector(
  [ getComments ],
  comments =>  {
    return {
      ...comments,
      data: nestReplies(Object.values(comments.data))
    }
  }
)

//eslint-disable-next-line
function getReplies(comments){
  const initialState = [{replies: []}];
  const arr = comments ? comments.map(comment => Object.assign({}, comment)) : [...initialState]

  //add {replies: []} to each value
  const addRepliesProp = arr
    .map(comment => {
      const nextState = Object.assign({}, comment)
      nextState.replies = []

      return nextState
    })
  ;
  //populate replies key with appropriate values
  const populateReplies = addRepliesProp
    .map(comment => {
      const data = addRepliesProp
        .filter(reply => reply.originid === comment.id)
        .map(reply => reply.id)
      ;
      return {
        ...comment,
        replies: [...data]
      }
    })

  const results = populateReplies

  return results
}