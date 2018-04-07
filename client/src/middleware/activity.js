import 'whatwg-fetch';
import 'babel-polyfill';
import { commentModel, listModel, replyModel } from './helpers_activity';
import { fetchFromApi, postToApi, deleteFromApi, normalizeData } from './helpers';

export async function fetchActivityData(cardId) {
  const url = `/api/activity/view/${cardId}`;
  const apiResults = await fetchFromApi(url);
  const results = normalizeData(apiResults)

  return results
}

export async function postCommentActivity(data) {
  const body = commentModel(data);
  const url = `/api/activity/create`;
  const results = await postToApi(url, body);

  return await results.json()
}

export async function postReplyActivity(data) {
  const body = replyModel(data);
  const url = `/api/activity/create`;
  const results = await postToApi(url, body);

  return await results.json()
}

export async function addListActivity(data) {
  const body = listModel(data);
  const url = `/api/activity/create`;

  await postToApi(url, body);
  return body
}

export async function deleteActivity(id) {
  const url = `/api/activity/delete/${id}`;
  return await deleteFromApi(url);
}


