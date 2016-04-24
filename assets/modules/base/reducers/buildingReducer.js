import * as BaseActions from '../actions/BaseActionTypes';
import * as BuldingsActions from '../actions/BuildingActionTypes';

export function buildings(state = {}, action) {
    switch(action.type) {
        case BaseActions.FETCH_BASE_SUCCESS:
            return Object.assign({}, state, action.payload.buildings);
        case BuldingsActions.CREATE_BUILDING_START:
            return Object.assign({}, state, {
                ...state,
                [action.payload.building.id]: action.payload.building
            });
        case BuldingsActions.CREATE_BUILDING_END:
        case BuldingsActions.UPGRADE_BUILDING_START:
        case BuldingsActions.UPGRADE_BUILDING_END:
            return {
                ...state,
                [action.payload.building.id]: building(state[action.payload.building.id], action)
            };
        default:
            return state;
    }
}

export function building (state = {}, action) {
    switch (action.type) {
        case BuldingsActions.UPGRADE_BUILDING_START:
        case BuldingsActions.CREATE_BUILDING_END:
            return Object.assign({}, state, action.payload.building);
        case BuldingsActions.UPGRADE_BUILDING_END:
            return Object.assign({}, state, {
                endsAt: 0,
                currentLevel: state.currentLevel + 1
            });
        default:
            return state;
    }
}
