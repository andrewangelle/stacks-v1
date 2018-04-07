import 'whatwg-fetch';
import 'babel-polyfill';
import { fetchFromApi, postToApi, deleteFromApi, normalizeData } from './helpers';

export async function fetchProjectsData(id) {
    const url = `/api/project/view/${id}`;
    const apiResults = await fetchFromApi(url);
    const results = normalizeData(apiResults)

    return results
}

export async function postProject(data) {
    const url = `/api/project/create`;
    return await postToApi(url, data);
}

export async function deleteProject(id) {
    const url = `/api/project/delete/${id}`;
    return await deleteFromApi(url);
}

export function normalizeAfterDnd(data) {
  const results = normalizeData(data);
  return results
}