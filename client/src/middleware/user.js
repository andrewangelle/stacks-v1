import 'whatwg-fetch';
import 'babel-polyfill';
import { newId } from '../utils/helpers';
import { fetchFromApi, postToApi } from './helpers';
import firebase, { auth, provider } from '../config/auth';

const qs = require('qs');


export async function checkAvailability(data) {
  const url = `/api/user/check?${qs.stringify(data)}`
  const results = await fetchFromApi(url);

  return results
}
/*
  same as loginAuth() except it hits the api to save user obj to database
  quick fix, could not implement a working sql statement
  that would create row *only* if the row doesn't already exist in table
*/
export async function createAccount(data) {
  const result = await auth
  .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(() => auth.signInWithPopup(provider))

  const userObj = {
    id: newId(),
    name: result.user.displayName,
    email: result.user.email,
    uid: result.user.uid
  }

  postToApi('/api/user/create', userObj);

  return userObj
}
/**
  @returns {object}
*/
export async function loginAuth() {
  const result = await auth
  .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(() => {
    return auth.signInWithPopup(provider)
  })

  const model = {
    name: result.user.displayName,
    email: result.user.email,
    uid: result.user.uid
  }

  return model
}

export async function signOutWithGmail() {
    return await auth.signOut();
}


