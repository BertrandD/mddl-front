import { FETCH_BASE_SUCCESS } from '../actions/BaseActionTypes';

function user (state = {}, action) {
    switch (action.type) {
        case FETCH_BASE_SUCCESS:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}

export default user;
