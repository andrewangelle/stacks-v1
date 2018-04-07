import { moment } from 'moment';
import { newId } from '../utils/newId'

/**
  *@params object
*/
export default function activityComment(data) {
  const model = {
    id: newId(),
    type: 'comment',
    message: 'posted a comment',
    parent: data.parent,
    author: data.author,
  }

  return model
}
