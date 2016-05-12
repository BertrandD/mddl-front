import * as Actions from '../actions/StaticActionTypes';

export function staticBuildings (state = {}, action) {
    switch (action.type) {
        case Actions.FETCH_BUILDINGS_SUCCESS:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}
export function staticItems (state = {}, action) {
    switch (action.type) {
        case Actions.FETCH_ITEMS_SUCCESS:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}