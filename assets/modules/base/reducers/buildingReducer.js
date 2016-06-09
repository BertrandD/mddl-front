import * as BaseActions from '../actions/BaseActionTypes';
import * as BuldingsActions from '../actions/BuildingActionTypes';
import reduce from 'lodash/reduce'

export function getBuildingsForBase(state, base) {
    if (!base || !base.buildingPositions) {
        return []
    }

    return reduce(base.buildingPositions, (result, buildingId) => {
        result.push(state.buildings[buildingId])
    }, []);
}

export function buildings(state = {}, action) {
    switch(action.type) {
        case BaseActions.FETCH_BASE_SUCCESS:
            return Object.assign({}, state, action.payload.buildings);
        case BuldingsActions.CREATE_BUILDING_START:
            return Object.assign({}, state, {
                ...state,
                [action.payload.building.id]: Object.assign({}, action.payload.building, {
                    startedAt: action.payload.building.startedAt
                })
            });
        case BuldingsActions.CREATE_BUILDING_END:
        case BuldingsActions.UPGRADE_BUILDING_START:
        case BuldingsActions.UPGRADE_BUILDING_END:
        case BuldingsActions.UPGRADE_BUILDING_WAIT:
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
        case BaseActions.FETCH_BASE_SUCCESS:
            return Object.assign({}, state, {
                queue: [
                    ...state.queue ? state.queue : [],
                    action.meta.event
                ]
            });
        case BuldingsActions.CREATE_BUILDING_END:
            return Object.assign({}, state, action.payload.building, {
                endsAt: 0,
                currentLevel: 1,
                startedAt: 0
            });
        case BuldingsActions.UPGRADE_BUILDING_WAIT:
            return Object.assign({}, state, {
                queue: [
                    ...state.queue ? state.queue : [],
                    action.meta.event
                ]
            });
        case BuldingsActions.UPGRADE_BUILDING_START:
            return Object.assign({}, state, {
                endsAt: action.meta.endsAt,
                startedAt: action.meta.startedAt
            });
        case BuldingsActions.UPGRADE_BUILDING_END:
            return Object.assign({}, state, {
                queue: [
                    ...state.queue ? state.queue.slice(1) : []
                ],
                endsAt: 0,
                startedAt: 0,
                currentLevel: state.currentLevel + 1
            });
        default:
            return state;
    }
}
