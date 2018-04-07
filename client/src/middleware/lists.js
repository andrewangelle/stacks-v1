import 'whatwg-fetch';
import 'babel-polyfill';
import { fetchFromApi, postToApi, deleteFromApi, normalizeData } from './helpers';
/**
  @param {string}
  @returns {object}
*/
export async function fetchListsData(cardId) {
  const url = `/api/list/view/${cardId}`;
  const apiResults = await fetchFromApi(url);
  const results = normalizeData(apiResults)

  return await results
}
/**
  @params {object}
  @returns {array}
*/
export async function postList(data) {
  const url = `/api/list/create`;
  return await postToApi(url, data.list);
}
/**
  @params {string}
  @returns {object}
*/
export async function deleteList(listId) {
  const url = `/api/list/delete/${listId}`;
  return await deleteFromApi(url);
}
/**
  @params array
  @returns obj
*/
export function normalizeAfterDnd(data) {
  const results = normalizeData(data);
  return results
}