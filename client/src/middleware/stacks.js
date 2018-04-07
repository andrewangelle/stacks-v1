import 'whatwg-fetch';
import 'babel-polyfill';
import { fetchFromApi, postToApi, deleteFromApi, normalizeData } from './helpers';

export async function fetchStacksData(projectId) {
  const url = `/api/stack/view/${projectId}`;
  const apiResults = await fetchFromApi(url);
  const results = normalizeData(apiResults)

  return results
}

export async function postStack(data) {
  const url = '/api/stack/create';
  return await postToApi(url, data);
}

export async function deleteStack(id) {
  const url = `/api/stack/delete/${id}`;
  return await deleteFromApi(url);
}

export function normalizeAfterDnd(data){
  const results = normalizeData(data)
  return results
}