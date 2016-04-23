import { SELECT_PLAYER, FETCH_PLAYER_FAILURE, FETCH_PLAYER_REQUEST, FETCH_PLAYER_SUCCESS, CREATE_PLAYER_SUCCESS, CREATE_PLAYER_FAILURE } from './PlayerActionTypes';
import { postAsForm, fetch } from '../../../utils/post-as-form'
import { push } from 'react-router-redux'
import { normalize, arrayOf } from 'normalizr'
import { player } from '../../../schema/schemas.js'


function fetchPlayerSuccess (player) {
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

export function selectPlayer (player) {
    return {
        type: SELECT_PLAYER,
        payload: player
    }
}


export function createPlayer ({ playerName }) {
    return dispatch => {
        return postAsForm('http://localhost:8080/player', { name: playerName })
            .then(res => {
                dispatch(createPlayerSuccess(normalize(res.payload, player).entities.players))
                dispatch(selectPlayer(res.payload))
            })
            .catch(res => {
                dispatch(createPlayerFailure(res.meta && res.meta.message ? res.meta.message : 'An error occured'))
            })
    }
}

export function fetchPlayer () {
    return dispatch => {
        return fetch('http://localhost:8080/me/player/')
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