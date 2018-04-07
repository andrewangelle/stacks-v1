import { normalizeData } from './helpers';
/**
  @returns {object} data - json object with the api results
*/
export async function fetchTableData() {
  const url = 'http://jsonplaceholder.typicode.com/posts'
  const res = await fetch(url)
  const jsonResults = await res.json()
  const data = normalizeData(jsonResults)

  return data
}