import { SELECT_PLAYER, FETCH_PLAYER_FAILURE, FETCH_PLAYER_REQUEST, FETCH_PLAYER_SUCCESS, CREATE_PLAYER_SUCCESS, CREATE_PLAYER_FAILURE, ACCEPT_FRIEND_SUCCESS, REQUEST_FRIEND_SUCCESS } from './../actionTypes/PlayerActionTypes';
import { postAsForm, fetch } from '../utils/post-as-form'
import { push } from 'react-router-redux'
import { normalize, arrayOf } from 'normalizr'
import { player } from '../schema/schemas.js'
import config from '../config'


export function fetchPlayerSuccess (player) {
    return {
        type: FETCH_PLAYER_SUCCESS,
        payload: player
    }
}

function createPlayerSuccess (player) {
    return {
        type: CREATE_PLAYER_SUCCESS,
        payload: player
    }
}

function createPlayerFailure (message) {
    return {
        type: CREATE_PLAYER_FAILURE,
        payload: message
    }
}

function fetchPlayerFailure (message) {
    return {
        type: FETCH_PLAYER_FAILURE,
        payload: { message }
    }
}

function acceptFriendSuccess (player) {
    return {
        type: ACCEPT_FRIEND_SUCCESS,
        payload: player
    }
}

function requestFriendSuccess (player) {
    return {
        type: REQUEST_FRIEND_SUCCESS,
        payload: player
    }
}

export function selectPlayer (player) {
    return {
        type: SELECT_PLAYER,
        payload: player
    }
}

export function acceptFriend ({ id }) {
    return dispatch => {
        return fetch(config.api.url + '/friend/accept/' + id)
            .then(res => {
                dispatch(acceptFriendSuccess(res.payload));
            })
    }
}

export function requestFriend ({ id }, message) {
    return dispatch => {
        return postAsForm(config.api.url + '/friend/request/', { playerId: id, message })
            .then(res => {
                dispatch(requestFriendSuccess(res.payload));
            })
    }
}

export function createPlayer ({ playerName }) {
    return dispatch => {
        return postAsForm(config.api.url + '/player', { name: playerName })
            .then(res => {
                dispatch(createPlayerSuccess(normalize(res.payload, player).entities.players));
                dispatch(selectPlayer(res.payload));
                dispatch(push('/create/base'));
            })
            .catch(res => {
                dispatch(createPlayerFailure(res.meta && res.meta.message ? res.meta.message : 'An error occured'))
            })
    }
}

export function fetchAccount() {
    return dispatch => {
        return fetch(config.api.url + '/me/')
            .catch(res => {
                dispatch(push('/login'));
                return Promise.reject();
            })
    }
}

export function fetchPlayer () {
    return dispatch => {
        return fetch(config.api.url + '/me/player/')
            .catch(res => {
                dispatch(fetchPlayerFailure(res.meta && res.meta.message ? res.meta.message : 'An error occured'));
                dispatch(push('/create/player'));
                return Promise.reject();
            })
            .then(res => {
                if (res.payload && res.payload.length === 0) {
                    dispatch(push('/create/player'));
                    return Promise.reject();
                } else {
                    dispatch(fetchPlayerSuccess(normalize(res.payload, arrayOf(player)).entities.players));
                    dispatch(selectPlayer(res.payload[0])); // FIXME : selecect currentPlayer
                }
            })
    };
}

export function fetchAllPlayers () {
    return dispatch => {
        return fetch(config.api.url + '/players/')
            .catch(res => {
                dispatch(fetchPlayerFailure(res.meta && res.meta.message ? res.meta.message : 'An error occured'));
                return Promise.reject();
            })
            .then(res => {
                dispatch(fetchPlayerSuccess(normalize(res.payload, arrayOf(player)).entities.players));
            })
    };
}