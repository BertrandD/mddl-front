import * as actions from './../actionTypes/SpaceActionTypes';
import { fetch } from '../utils/post-as-form'
import { normalize, arrayOf } from 'normalizr'
import { astralObject, report, player } from 'schema/schemas.js'
import config from '../config'
import { fetchPlayerSuccess } from './playerActions'

function fetchStarSuccess(astralObject) {
    return {
        type: actions.FETCH_SYSTEM_SUCCESS,
        payload: astralObject
    }
}

function scanSuccess(report) {
    return {
        type: actions.SCAN_SUCCESS,
        payload: report
    }
}

export function scanAstralObject({ id }) {
    return dispatch => {
        return fetch(config.api.url + '/scan/' + id)
            .then(res => {
                dispatch(scanSuccess(normalize(res.payload, arrayOf(report)).entities));
                dispatch(fetchPlayerSuccess(normalize(res.meta.player, player).entities.players))
            })
    }
}


export function fetchMyStar() {
    return dispatch => {
        return fetch(config.api.url + '/system')
            .then(res => {
                dispatch(fetchStarSuccess(normalize(res.payload, astralObject).entities));
            })
    }
}

export function fetchStar(id) {
    return dispatch => {
        return fetch(config.api.url + '/system/' + id)
            .then(res => {
                dispatch(fetchStarSuccess(normalize(res.payload, astralObject).entities));
            })
    }
}
