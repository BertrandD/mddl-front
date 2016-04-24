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
            return Object.assign({}, state, action.payload);
        case BuldingsActions.CREATE_BUILDING_START:
        case BuldingsActions.CREATE_BUILDING_END:
        case BuldingsActions.UPGRADE_BUILDING_START:
        case BuldingsActions.UPGRADE_BUILDING_END:
            return {
                ...state,
                [action.payload.base.id]: base(state[action.payload.base.id], action)
            };
        default:
            return state;
    }
}

function base (state = {
    buildings: [], 
    buildingQueue: []
}, action) {
    switch (action.type) {
        case BuldingsActions.UPGRADE_BUILDING_START:
            return Object.assign({}, state, {
                buildings: state.buildings.filter((building) => building.id !== action.payload.building.id),
                buildingQueue: [
                    ...state.buildingQueue ? state.buildingQueue : [],
                    action.payload.building
                ]
            });
        case BuldingsActions.CREATE_BUILDING_START:
            return Object.assign({}, state, {
                buildingQueue: [
                    ...state.buildingQueue ? state.buildingQueue : [],
                    action.payload.building
                ]
            });
        case BuldingsActions.CREATE_BUILDING_END:
        case BuldingsActions.UPGRADE_BUILDING_END:
            return Object.assign({}, state, {
                buildingQueue: state.buildingQueue.filter((building) => {
                    return building.id !== action.payload.building.id
                }),
                buildings: [
                    ...state.buildings,
                    Object.assign({}, action.payload.building, {
                        currentLevel: action.payload.building.currentLevel+1
                    })
                ]
            });
        default:
            return state;
    }
}

export default base;
