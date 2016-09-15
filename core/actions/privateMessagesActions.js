import { postAsForm, fetch } from '../utils/post-as-form'
import config from '../config'
import * as PMActions from './../actionTypes/PrivateMessageActionTypes'
import { pm } from '../schema/schemas.js'
import { notify } from './appActions'
import { normalize, arrayOf } from 'normalizr'

export function sendMessageSuccess(pm) {
    return {
        type: PMActions.SEND_MESSAGE_SUCCESS,
        payload: pm
    }
}

export function fetchMessageSuccess(pms) {
    return {
        type: PMActions.FETCH_MESSAGE_SUCCESS,
        payload: pms
    }
}

export function fetchMessages() {
    return dispatch => {
        return fetch(config.api.url + '/pm')
            .then(res => {
                dispatch(fetchMessageSuccess(normalize(res.payload, arrayOf(pm)).entities));
            })
            .catch(res => {
                dispatch(notify(res.meta && res.meta.message ? res.meta.message : 'Could not get messages'));
            })
    };
}

export function sendMessage({ id }, message) {
    return dispatch => {
        return postAsForm(config.api.url + '/pm', {receiver: id, message})
            .then(res => {
                dispatch(sendMessageSuccess(normalize(res.payload, pm).entities));
            })
            .catch(res => {
                dispatch(notify(res.meta && res.meta.message ? res.meta.message : 'Could not send message'));
            })
    }
}