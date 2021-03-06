import * as Actions from '../actionTypes/StaticActionTypes';


export function getStaticBuildings(state) {
    return state.entities.staticBuildings
}

export function getStaticItems(state) {
    return state.entities.staticItems
}

export function getStaticItemsFromType(state, type) {
    const items = {};
    state.shortcuts[type].forEach((itemId) => {
        items[itemId] = state.entities.staticItems[itemId];
    });
    return items;
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