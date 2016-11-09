import * as Actions from '../actionTypes/StaticActionTypes';


export function getStaticBuildings(state) {
    return state.entities.staticBuildings
}

export function getStaticItems(state) {
    return state.entities.staticItems
}

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