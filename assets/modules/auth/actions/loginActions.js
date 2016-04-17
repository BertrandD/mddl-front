import { FETCH_LOGIN_SUCCESS, FETCH_LOGIN_ERROR } from './LoginActionTypes';
import { push } from 'react-router-redux'
import { postAsForm, fetch } from '../../../utils/post-as-form'

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

export function fetchAuthentication () {
  return dispatch => {
    return fetch('http://localhost:8080/me')
        .then(res => {
          dispatch(loginSuccess(res.payload));
          dispatch(push('/'));
        })
        .catch(res => {
          dispatch(loginError(res.meta.message ? res.meta.message : 'An error occured'));
          dispatch(push('/login'));
        })
  }
}