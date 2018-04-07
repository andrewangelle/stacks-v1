import 'whatwg-fetch';
import 'babel-polyfill';
import {
  fetchFromApi,
  postToApi,
  deleteFromApi,
  normalizeData
} from './helpers';

export async function fetchCommentsData(cardId) {
  const url = `/api/comment/view/${cardId}`;
  const apiResults = await fetchFromApi(url);
  const results = normalizeData(apiResults);

  return results
}

export async function postComment(data) {
  const url = `/api/comment/create`;
  return await postToApi(url, data.comment);
}

export async function postReply(data) {
  const url = `/api/comment/reply`;
  return await postToApi(url, data.comment);
}

export async function deleteComment(id) {
  const url = `/api/comment/delete/${id}`;
  return await deleteFromApi(url);
}


