import * as Actions from '../actionTypes/StaticActionTypes';
import forEach from 'lodash/forEach'

export function shortcuts (state={}, action) {
    switch (action.type) {
        case Actions.FETCH_ITEMS_SUCCESS:
            const shortcuts = {};

            forEach(action.payload, (item) => {
                if (!shortcuts[item.type]) {
                    shortcuts[item.type] = []
                }
                shortcuts[item.type].push(item.itemId);
            });

            return Object.assign({}, state, shortcuts);
        default:
            return state;
    }
}