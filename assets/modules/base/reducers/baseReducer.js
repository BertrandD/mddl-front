import { FETCH_BASE_SUCCESS, CREATE_BASE_FAILURE, CREATE_BASE_SUCCESS, SELECT_BASE } from '../actions/BaseActionTypes';
import { CREATE_BUILDING_START, CREATE_BUILDING_END } from '../actions/BuildingActionTypes';

export function currentBase (state = {
    id:""
}, action) {
    switch(action.type) {
        case SELECT_BASE:
            return Object.assign({}, state, {
                id: action.payload.id
            });
        default:
            return state;
    }
}

export function bases(state = {}, action) {
    switch(action.type) {
        case CREATE_BASE_SUCCESS:
        case FETCH_BASE_SUCCESS:
            return Object.assign({}, state, action.payload);
        case CREATE_BUILDING_START:
        case CREATE_BUILDING_END:
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
        case CREATE_BUILDING_START:
            return Object.assign({}, state, {
                buildingQueue: [
                    ...state.buildingQueue ? state.buildingQueue : [],
                    action.payload.building
                ]
            });
        case CREATE_BUILDING_END:
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
