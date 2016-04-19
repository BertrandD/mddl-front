import { FETCH_BASE_SUCCESS, CREATE_BASE_FAILURE, CREATE_BASE_SUCCESS } from '../actions/BaseActionTypes';
import { CREATE_BUILDING_START, CREATE_BUILDING_END } from '../actions/BuildingActionTypes';

function base (state = {
    buildings: [], 
    buildingQueue: []
}, action) {
    switch (action.type) {
        case CREATE_BASE_SUCCESS:
        case FETCH_BASE_SUCCESS:
            return Object.assign({}, state, action.payload, {
                createSuccess: true
            });
        case CREATE_BUILDING_START:
            return Object.assign({}, state, {
                buildingQueue: [
                    ...state.buildingQueue,
                    action.payload
                ]
            });
        case CREATE_BUILDING_END:
            return Object.assign({}, state, {
                buildingQueue: state.buildingQueue.filter((building) => {
                    return building.id !== action.payload.id
                }),
                buildings: [
                    ...state.buildings,
                    Object.assign({}, action.payload, {
                        currentLevel: action.payload.currentLevel+1
                    })
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
