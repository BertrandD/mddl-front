import { FETCH_LOGIN_SUCCESS, FETCH_LOGIN_ERROR } from '../constants/ActionTypes';
import { push } from 'react-router-redux'
import { postAsForm } from '../utils/post-as-form'

function loginSuccess (user) {
  return {
    type: FETCH_LOGIN_SUCCESS,
    payload: user
  }
}

function loginError (message) {
  return {
    type: FETCH_LOGIN_ERROR,
    payload: { message }
  }
}

export function fetchLogin ({ username, password }) {
  return dispatch => {
    return postAsForm('http://localhost:8080/login', {username, password})
      .then(res => {
        dispatch(loginSuccess(res.payload));
        dispatch(push('/'));
      })
      .catch(res => {
        dispatch(loginError(res.meta.message ? res.meta.message : 'An error occured'));
      })
  };
}
