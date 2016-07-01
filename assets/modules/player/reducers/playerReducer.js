import { FETCH_PLAYER_SUCCESS, CREATE_PLAYER_SUCCESS, CREATE_PLAYER_FAILURE, SELECT_PLAYER, ACCEPT_FRIEND_SUCCESS, REQUEST_FRIEND_SUCCESS } from '../actions/PlayerActionTypes';
import * as LoginActions from '../../auth/actions/LoginActionTypes';

export function getcurrentPlayer(state) {
    return state.entities.players[state.currentPlayer.id]
}

export function getAllPlayers(state) {
    return state.entities.players;
}

export function currentPlayer (state = {
    id:""
}, action) {
    switch(action.type) {
        case LoginActions.LOGOUT:
            return {};
        case SELECT_PLAYER:
            return Object.assign({}, state, {
                id: action.payload.id
            });
        default:
            return state;
    }
}

export function players (state = {}, action) {
    switch (action.type) {
        case LoginActions.LOGOUT:
            return {};
        case CREATE_PLAYER_SUCCESS:
        case FETCH_PLAYER_SUCCESS:
            return Object.assign({}, state, action.payload);
        case REQUEST_FRIEND_SUCCESS:
        case ACCEPT_FRIEND_SUCCESS:
            return {
                ...state,
                [action.payload.id]: player(state, action)
            };
        default:
            return state;
    }
}

function player (state = {}, action) {
    switch (action.type) {
        case REQUEST_FRIEND_SUCCESS:
        case ACCEPT_FRIEND_SUCCESS:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}

export default player;
