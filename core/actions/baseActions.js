import * as actions from './../actionTypes/BaseActionTypes';
import { postAsForm, fetch } from '../utils/post-as-form'
import { push } from 'react-router-redux'
import { normalize, arrayOf } from 'normalizr'
import { base } from 'schema/schemas.js'
import { upgradeBuildingWait, upgradeBuildingStart, upgradeBuildingEnd, createBuildingEnd } from './buildingActions'
import config from '../config'
import addEvent from '../utils/addEvent'
import forEach from '../../node_modules/lodash/forEach'

export function fetchBaseSuccess(base, meta = null) {
    return {
        type: actions.FETCH_BASE_SUCCESS,
        payload: base,
        meta
    }
}

function fetchBaseFailure(message) {
    return {
        type: actions.FETCH_BASE_FAILURE,
        payload: {message}
    }
}

function createBaseSuccess(base) {
    return {
        type: actions.CREATE_BASE_SUCCESS,
        payload: base
    }
}

function createBaseFailure(message) {
    return {
        type: actions.CREATE_BASE_FAILURE,
        payload: message
    }
}

export function selectBase(base) {
    return dispatch => {

        dispatch({
            type: actions.SELECT_BASE,
            payload: base
        });
    }
}

export function updateBase({ id }) {
    return dispatch => {
        return fetch(config.api.url + '/me/base/' + id)
            .then(res => {
                dispatch(fetchBaseSuccess(normalize(res.payload, base).entities, res.meta));
            })
            .catch(res => {
                dispatch(fetchBaseFailure(res.meta && res.meta.message ? res.meta.message : 'An error occured'));
            })
    };
}

export function createBase({ baseName, player }) {
    return dispatch => {
        return postAsForm(config.api.url + '/base', {name: baseName, player})
            .then(res => {
                dispatch(createBaseSuccess(normalize(res.payload, base).entities));
                dispatch(selectBase(res.payload));
                dispatch(push('/'));
            })
            .catch(res => {
                dispatch(createBaseFailure(res.meta && res.meta.message ? res.meta.message : 'An error occured'))
            })
    }
}

export function fetchMyBases() {
    return dispatch => {
        return fetch(config.api.url + '/me/base')
            .then(res => {
                if (res.payload && res.payload.length === 0) {
                    dispatch(push('/create/base'));
                } else {
                    dispatch(fetchBaseSuccess(normalize(res.payload, arrayOf(base)).entities));
                }
            })
            .catch(res => {
                dispatch(fetchBaseFailure(res.meta && res.meta.message ? res.meta.message : 'An error occured'));
            })
    };
}

export function fetchBase({ id }) {
    return dispatch => {
        return fetch(config.api.url + '/me/base/' + id)
            .then(res => {
                dispatch(fetchBaseSuccess(normalize(res.payload, base).entities, res.meta));
                try {
                    const queue = {};

                    res.meta.queue.forEach((event, index) => {
                        queue[event.building.id] = [
                            ...queue[event.building.id] ? queue[event.building.id] : [],
                            event
                        ]
                    });

                    forEach(queue, (buildingQueue) => {
                        buildingQueue.forEach((event, index) => {
                            dispatch(
                                addEvent(
                                    index === 0 ? event.building.startedAt : buildingQueue[index - 1].endsAt + 1,
                                    event.endsAt,
                                    upgradeBuildingStart(res.payload, event.building, index === 0 ? event.building.startedAt : buildingQueue[index - 1].endsAt + 1, event.endsAt),
                                    upgradeBuildingEnd(res.payload, event.building)
                                )
                            );
                            if (index >= 1) {
                                setTimeout(dispatch.bind(null, upgradeBuildingWait(res.payload, event.building, event)), 0);
                            }
                        })
                    })
                } catch (e) {
                    console.error(e)
                }
            })
            .catch(res => {
                dispatch(fetchBaseFailure(res.meta && res.meta.message ? res.meta.message : 'An error occured'));
            })
    };
}