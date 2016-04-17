import { FETCH_PLAYER_FAILURE, FETCH_PLAYER_REQUEST, FETCH_PLAYER_SUCCESS } from './PlayerActionTypes';
import { postAsForm, fetch } from '../../../utils/post-as-form'
import { push } from 'react-router-redux'


function fetchPlayerSuccess (player) {
    return {
        type: FETCH_PLAYER_SUCCESS,
        payload: player
    }
}

function fetchPlayerFailure (message) {
    return {
        type: FETCH_PLAYER_FAILURE,
        payload: { message }
    }
}

export function fetchPlayer () {
    return dispatch => {
        return fetch('http://localhost:8080/me/player/')
            .then(res => {
                if (res.payload && res.payload.length === 0) {
                    dispatch(push('/create/player'));
                } else {
                    dispatch(fetchPlayerSuccess(res.payload));
                }
            })
            .catch(res => {
                dispatch(fetchPlayerFailure(res.meta.message ? res.meta.message : 'An error occured'));
            })
    };
}