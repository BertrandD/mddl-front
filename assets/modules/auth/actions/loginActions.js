import { FETCH_LOGIN_SUCCESS, FETCH_LOGIN_ERROR } from './LoginActionTypes';
import { push } from 'react-router-redux'
import { postAsForm, fetch } from '../../../utils/post-as-form'
import { normalize, arrayOf } from 'normalizr'
import { user } from '../../../schema/schemas.js'
import config from '../../../config'

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

export function register({ username, password }) {
    return dispatch => {
        return postAsForm(config.api.url + '/register', {username, password})
            .then(res => {
                dispatch(loginSuccess(res.payload));
                dispatch(push('/'));
            })
            .catch(res => {
                dispatch(loginError(res.meta.message ? res.meta.message : 'An error occured'));
            })
    };
}

export function fetchLogin ({ username, password }) {
  return dispatch => {
    return postAsForm(config.api.url + '/login', {username, password})
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
    return fetch(config.api.url + '/me')
        .catch(res => {
            dispatch(loginError(res.meta.message ? res.meta.message : 'An error occured'));
            dispatch(push('/login'));
            return Promise.reject();
        })
        .then(res => {
            dispatch(loginSuccess(res.payload));
        })
  }
}