import { FETCH_LOGIN_SUCCESS, FETCH_LOGIN_ERROR, LOGOUT } from './../actionTypes/LoginActionTypes';
import { push } from 'react-router-redux'
import { postAsForm, fetch } from '../utils/post-as-form'
import config from '../config'
import { notify } from './appActions'

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

function logoutSuccess() {
  return {
    type: LOGOUT,
    payload: {}
  }
}

export function logout () {
  return dispatch => {
    dispatch(logoutSuccess());
    dispatch(push('/login'))
  }
}

export function register({ username, password }) {
    return dispatch => {
        return postAsForm(config.api.url + '/register', {username, password})
            .then(res => {
                dispatch(loginSuccess(res));
                dispatch(push('/create/player'));
            })
            .catch(res => {
                dispatch(loginError(res.meta.message ? res.meta.message : 'An error occurred : ' + res));
            })
    };
}

export function fetchLogin ({ username, password }) {
  return dispatch => {
    return postAsForm(config.api.url + '/login', {username, password})
      .then(res => {
          dispatch(loginSuccess(res));
        dispatch(push('/loading'));
      })
      .catch(res => {
          if (res.status === 400) {
              dispatch(notify('Invalid credentials'));
              dispatch(loginError('Invalid credentials'));
          } else {
              dispatch(notify(res.meta.message ? res.meta.message : 'An error occurred'));
              dispatch(loginError(res.meta.message ? res.meta.message : 'An error occurred'));
          }
      })
  };
}

export function fetchAuthentication () {
  return dispatch => {
    return fetch(config.api.url + '/me')
        .catch(res => {
            dispatch(loginError(res.meta.message ? res.meta.message : 'An error occurred : ' + res));
            dispatch(push('/login'));
            return Promise.reject();
        })
        .then(res => {
            dispatch(loginSuccess(res.payload));
        })
  }
}