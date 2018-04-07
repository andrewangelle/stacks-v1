import 'whatwg-fetch';
import 'babel-polyfill';

const serverUrl = process.env.REACT_APP_SERVER_URL;
/**
  HTTP helpers
*/
export async function fetchFromApi(req) {
  const res = await fetch(`${serverUrl}${req}`, { method: 'get' });
  const data = await res.json();

  return data;
}

export async function postToApi(req, body) {
  const results = await fetch(`${serverUrl}${req}`,{
    method: 'post',
    headers: {
        'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify(body)
  });

  return await results
}

export async function deleteFromApi(req) {
  return await fetch(`${serverUrl}${req}`, {
    method: 'delete'
  })
}


export async function putToApi(queryString) {
  const res = fetch(`${serverUrl}${queryString}`, { method: 'put' })

  return await res
}

/**
  @param {array} arr - an array of objects with a unique id prop
  @returns {object} - a single object with the values of the passed array keyed by its corresponding id
*/
export const normalizeData = arr => arr ?
  arr.reduce((acc, currentValue) => {

    const next = {
      [currentValue.id]: currentValue
    }

    return {...acc,...next}
  },{}) : []
;