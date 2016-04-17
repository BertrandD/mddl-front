import { FETCH_PLAYER_SUCCESS, CREATE_PLAYER_SUCCESS, CREATE_PLAYER_FAILURE } from '../actions/PlayerActionTypes';

function player (state = {}, action) {
    switch (action.type) {
        case CREATE_PLAYER_SUCCESS:
        case FETCH_PLAYER_SUCCESS:
            return Object.assign({}, state, action.payload, {
                createSuccess: true
            });
        case CREATE_PLAYER_FAILURE:
            return Object.assign({}, state, {
                createSuccess: false,
                error: action.payload
            });
        default:
            return state;
    }
}

export default player;
