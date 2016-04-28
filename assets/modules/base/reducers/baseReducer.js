import * as BaseActions from '../actions/BaseActionTypes';
import * as BuldingsActions from '../actions/BuildingActionTypes';

export function currentBase (state = {
    id:""
}, action) {
    switch(action.type) {
        case BaseActions.SELECT_BASE:
            return Object.assign({}, state, {
                id: action.payload.id
            });
        default:
            return state;
    }
}

export function bases(state = {}, action) {
    switch(action.type) {
        case BaseActions.CREATE_BASE_SUCCESS:
        case BaseActions.FETCH_BASE_SUCCESS:
            return Object.assign({}, state, action.payload.bases);
        case BuldingsActions.CREATE_BUILDING_START:
            return {
                ...state,
                [action.payload.base.id]: base(state[action.payload.base.id], action)
            };
        default:
            return state;
    }
}

function base (state = {
    buildings: []
}, action) {
    switch (action.type) {
        case BuldingsActions.CREATE_BUILDING_START:
            const buildingPositions = state.buildingPositions;
            return Object.assign({}, state, {
                buildingPositions: {
                    ...buildingPositions,
                    [action.meta.position]: action.payload.building.id
                },
                buildings: [
                    ...state.buildings,
                    action.payload.building.id
                ]
            });
        default:
            return state;
    }
}

export default base;
