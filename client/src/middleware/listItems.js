import 'whatwg-fetch';
import 'babel-polyfill';
import { fetchFromApi, postToApi, deleteFromApi, putToApi, normalizeData } from './helpers';

export async function fetchListItemsData(cardId) {
  const url = `/api/item/view/${cardId}`;
  const apiResults = await fetchFromApi(url);
  const results = normalizeData(apiResults);

  return results
}

export async function postListItem(data) {
  const url = `/api/item/create`;
  return await postToApi(url, data);
}

export async function putListItem(id) {
  const url = `/api/item/put/${id}`;
  return await putToApi(url)
}

export async function deleteListItem(id) {
  const url = `/api/item/delete/${id}`;
  return await deleteFromApi(url);
}


