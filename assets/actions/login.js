import fetch from 'isomorphic-fetch'
import { FETCH_LOGIN_SUCCESS } from '../constants/ActionTypes';
import { push } from 'react-router-redux'

function loginSuccess ({ email, password }) {
  return {
    type: FETCH_LOGIN_SUCCESS,
    payload: { email, password }
  }
}

export function fetchLogin ({ email, password }) {
  return dispatch => {
    return fetch('/api/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(json => {
        dispatch(loginSuccess(json))
        dispatch(push('/'));
      })
  };
}
