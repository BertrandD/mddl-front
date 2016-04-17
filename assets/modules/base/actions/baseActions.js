import { FETCH_BASE_FAILURE, FETCH_BASE_REQUEST, FETCH_BASE_SUCCESS, CREATE_BASE_SUCCESS, CREATE_BASE_FAILURE } from './BaseActionTypes';
import { postAsForm, fetch } from '../../../utils/post-as-form'
import { push } from 'react-router-redux'

function fetchBaseSuccess (base) {
    return {
        type: FETCH_BASE_SUCCESS,
        payload: base
    }
}

function fetchBaseFailure (message) {
    return {
        type: FETCH_BASE_FAILURE,
        payload: { message }
    }
}

function createBaseSuccess (base) {
    return {
        type: CREATE_BASE_SUCCESS,
        payload: base
    }
}

function createBaseFailure (message) {
    return {
        type: CREATE_BASE_FAILURE,
        payload: message
    }
}

export function createBase ({ baseName, player }) {
    return dispatch => {
        return postAsForm('http://localhost:8080/base', { name: baseName, player })
            .then(res => {
                dispatch(createBaseSuccess(res.payload))
            })
            .catch(res => {
                dispatch(createBaseFailure(res.meta && res.meta.message ? res.meta.message : 'An error occured'))
            })
    }
}

export function fetchBase () {
    return dispatch => {
        return fetch('http://localhost:8080/me/base')
            .then(res => {
                if (res.payload && res.payload.length === 0) {
                    dispatch(push('/create/base'));
                } else {
                    dispatch(fetchBaseSuccess(res.payload[0]));
                }
            })
            .catch(res => {
                dispatch(fetchBaseFailure(res.meta && res.meta.message ? res.meta.message : 'An error occured'));
            })
    };
}