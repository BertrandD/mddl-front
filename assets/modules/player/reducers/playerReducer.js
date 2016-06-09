import { FETCH_PLAYER_SUCCESS, CREATE_PLAYER_SUCCESS, CREATE_PLAYER_FAILURE, SELECT_PLAYER } from '../actions/PlayerActionTypes';

export function getcurrentPlayer(state) {
    return state.entities.players[state.currentPlayer.id]
}

export function currentPlayer (state = {
    id:""
}, action) {
    switch(action.type) {
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
        case CREATE_PLAYER_SUCCESS:
        case FETCH_PLAYER_SUCCESS:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}

function player (state = {}, action) {
    switch (action.type) {
        default:
            return state;
    }
}

export default player;
