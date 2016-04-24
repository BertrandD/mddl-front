import { SELECT_BASE, FETCH_BASE_FAILURE, FETCH_BASE_REQUEST, FETCH_BASE_SUCCESS, CREATE_BASE_SUCCESS, CREATE_BASE_FAILURE } from './BaseActionTypes';
import { postAsForm, fetch } from '../../../utils/post-as-form'
import { push } from 'react-router-redux'
import { normalize, arrayOf } from 'normalizr'
import { base } from '../../../schema/schemas.js'
import { upgradeBuildingEnd, createBuildingEnd } from './buildingActions'
import config from '../../../config'

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

const threads = [];

export function selectBase (base) {
    return dispatch => {

        threads.forEach((thread) => {
            clearTimeout(thread);
        });

        base.buildings.forEach((building) => {
            if (building.endsAt > 0) {
                threads.push(setTimeout(() => {
                    if (building.currentLevel === 0) {
                        dispatch(createBuildingEnd(base, building));
                    } else {
                        dispatch(upgradeBuildingEnd(base, building));
                    }
                }, building.endsAt - Date.now()));
            }
        });

        dispatch({
            type: SELECT_BASE,
            payload: base
        });
    }
}

export function createBase ({ baseName, player }) {
    return dispatch => {
        return postAsForm(config.api.url + '/base', { name: baseName, player })
            .then(res => {
                dispatch(createBaseSuccess(normalize(res.payload, base).entities));
                dispatch(selectBase(res.payload));
            })
            .catch(res => {
                dispatch(createBaseFailure(res.meta && res.meta.message ? res.meta.message : 'An error occured'))
            })
    }
}

export function fetchMyBases () {
    return dispatch => {
        return fetch(config.api.url + '/me/base')
            .then(res => {
                if (res.payload && res.payload.length === 0) {
                    dispatch(push('/create/base'));
                } else {
                    dispatch(fetchBaseSuccess(normalize(res.payload, arrayOf(base)).entities));
                    try {
                        dispatch(selectBase(res.payload[0])); // FIXME select currentBase
                    } catch(e) {
                        console.error(e);
                    }
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
        return fetch(config.api.url + '/me/base/' + id)
            .then(res => {
                dispatch(fetchBaseSuccess(normalize(res.payload, base).entities));
            })
            .catch(res => {
                dispatch(fetchBaseFailure(res.meta && res.meta.message ? res.meta.message : 'An error occured'));
            })
    };
}