import * as BaseActions from '../actions/BaseActionTypes';
import * as BuldingsActions from '../../buildings/actions/BuildingActionTypes';
import * as AppActions from '../../core/actions/AppActionTypes';
import clone from 'lodash/clone';
import map from 'lodash/map';
import omit from 'lodash/omit';

import forEach from 'lodash/forEach'

export function getCurrentBase (state) {
    return state.entities.bases[state.currentBase.id];
}

export function getPopulatedCurrentBase (state) {
    return populateBase(state, state.entities.bases[state.currentBase.id]);
}

export function populateBase(state, base) {
    if (!base) {
        return base;
    }
    const buildings = [];
    map(base.buildings, (id) => {
        buildings.push(populateBuilding(state, state.entities.buildings[id]))
    });

    return {...base, buildings};
}

export function populateBuilding (state, building) {
    return {
        ...building,
        ...omit(state.entities.staticBuildings[building.buildingId], ['id'])
    }
}

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

            const bases = {};
            forEach(action.payload.bases, (base, id) => {
                const inventory = {};
                forEach(base.inventory, (items, name) => {
                    const newItems = {};
                    items.forEach((item) => {
                        newItems[item.templateId] = item;
                    });
                    inventory[name] = newItems;
                });
                bases[id] = {...base, inventory};
            });

            return Object.assign({}, state, bases);
        case BuldingsActions.CREATE_BUILDING_START:
            return {
                ...state,
                [action.payload.base.id]: base(state[action.payload.base.id], action)
            };
        case AppActions.REFRESH:

            const newState = {};

            forEach(state, (b, id) => {
                newState[id] = base(b, action);
            });

            return newState;
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
        case AppActions.REFRESH:

            const now = Date.now();

            const newState = clone(state);

            forEach(newState.production, (prod, id) => {
                const toProduce =  (prod / 3600) * ((now - newState.lastRefresh) / 1000);
                if (newState.inventory.RESOURCE[id] && newState.maxVolumes.max_volume_resources >= newState.inventory.RESOURCE[id].count + toProduce) {
                    newState.inventory.RESOURCE[id].count += toProduce;
                }
            });
            newState.lastRefresh = now;

            return newState;
        default:
            return state;
    }
}

export default base;
