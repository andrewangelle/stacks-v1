import { newId } from '../utils/helpers';
import moment from 'moment';

/**
  @param {object}
  @returns {object}
*/
export function commentModel(data) {
  const model = {
    id: newId(),
    type: 'comment',
    message: `${data.name} posted a comment`,
    parent: data.comment.parent,
    author: data.comment.author,
    created: moment.utc()
  }

  return model
}
/**
  @param {object}
  @returns {object}
*/
export function replyModel(data) {
  const model = {
    id: newId(),
    type: 'reply',
    message: `${data.name} replied to a comment`,
    parent: data.comment.parent,
    author: data.comment.author,
    created: moment.utc()
  }

  return model
}
/**
  @param {object}
  @returns {object}
*/
export function listModel(data) {
  const model = {
    id: newId(),
    type: 'list',
    message: `${data.userName} created a new list`,
    parent: data.list.parent,
    author: data.list.author,
    created: moment.utc()
  }

  return model
}