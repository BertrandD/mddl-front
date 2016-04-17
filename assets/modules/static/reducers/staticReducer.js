import { FETCH_BUILDINGS_SUCCESS } from '../actions/StaticActionTypes';

export function staticBuildings (state = [], action) {
    switch (action.type) {
        case FETCH_BUILDINGS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}