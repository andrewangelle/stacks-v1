import 'whatwg-fetch';
import 'babel-polyfill';
import { fetchFromApi, postToApi, deleteFromApi, putToApi, normalizeData } from './helpers';

const qs = require('qs')

export async function fetchCardsData(stackId) {
  const url = `/api/card/view/${stackId}`;
  const apiResults = await fetchFromApi(url);
  const results = normalizeData(apiResults);

  return results
}

export async function fetchCard(id) {
  const url = `/api/card/${id}`;
  const apiResults = await fetchFromApi(url);
  const results = await normalizeData(apiResults);

  return results
}

export async function postCard(body) {
  const url = `/api/card/create`;
  return await postToApi(url, body);
}

export async function updateCard(data) {
  const query = qs.stringify(data);
  const url = `/api/card/update?${query}`;
  console.log(url)
  return await putToApi(url)
}

export async function deleteCard(id) {
  const url = `/api/card/delete/${id}`;
  return await deleteFromApi(url);
}

