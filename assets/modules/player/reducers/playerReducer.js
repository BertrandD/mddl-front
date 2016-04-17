import { FETCH_PLAYER_SUCCESS } from '../actions/PlayerActionTypes';

function player (state = {}, action) {
    switch (action.type) {
        case FETCH_PLAYER_SUCCESS:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}

export default player;
