import { FETCH_BASE_SUCCESS, CREATE_BASE_FAILURE, CREATE_BASE_SUCCESS } from '../actions/BaseActionTypes';
import { CREATE_BUILDING_SUCCESS } from '../actions/BuildingActionTypes';

function base (state = {buildings: []}, action) {
    switch (action.type) {
        case CREATE_BASE_SUCCESS:
        case FETCH_BASE_SUCCESS:
            return Object.assign({}, state, action.payload, {
                createSuccess: true
            });
        case CREATE_BUILDING_SUCCESS:
            return Object.assign({}, state, {
                buildings: [
                    ...state.buildings,
                    action.payload
                ]
            });
        case CREATE_BASE_FAILURE:
            return Object.assign({}, state, {
                createSuccess: false,
                error: action.payload
            });
        default:
            return state;
    }
}

export default base;
