import { SELECT_BASE, FETCH_BASE_FAILURE, FETCH_BASE_REQUEST, FETCH_BASE_SUCCESS, CREATE_BASE_SUCCESS, CREATE_BASE_FAILURE } from './BaseActionTypes';
import { postAsForm, fetch } from '../../../utils/post-as-form'
import { push } from 'react-router-redux'
import { normalize, arrayOf } from 'normalizr'
import { base } from '../../../schema/schemas.js'

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


export function selectBase (base) {
    return {
        type: SELECT_BASE,
        payload: base
    }
}

export function createBase ({ baseName, player }) {
    return dispatch => {
        return postAsForm('http://localhost:8080/base', { name: baseName, player })
            .then(res => {
                dispatch(createBaseSuccess(normalize(res.payload, base)));
                dispatch(selectBase(res.payload));
            })
            .catch(res => {
                dispatch(createBaseFailure(res.meta && res.meta.message ? res.meta.message : 'An error occured'))
            })
    }
}

export function fetchMyBases () {
    return dispatch => {
        return fetch('http://localhost:8080/me/base')
            .then(res => {
                if (res.payload && res.payload.length === 0) {
                    dispatch(push('/create/base'));
                } else {
                    dispatch(fetchBaseSuccess(normalize(res.payload, arrayOf(base))));
                    dispatch(selectBase(res.payload[0])); // FIXME select currentBase
                    dispatch(fetchBase(res.payload[0])); // FIXME move it ?
                }
            })
            .catch(res => {
                dispatch(fetchBaseFailure(res.meta && res.meta.message ? res.meta.message : 'An error occured'));
            })
    };
}

export function fetchBase ({ id }) {
    return dispatch => {
        return fetch('http://localhost:8080/me/base/' + id)
            .then(res => {
                dispatch(fetchBaseSuccess(normalize(res.payload, base)));
            })
            .catch(res => {
                dispatch(fetchBaseFailure(res.meta && res.meta.message ? res.meta.message : 'An error occured'));
            })
    };
}