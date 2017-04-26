import * as BaseActions from '../actionTypes/BaseActionTypes';
import * as BuldingsActions from '../actionTypes/BuildingActionTypes';
import * as AppActions from '../actionTypes/AppActionTypes';
import * as LoginActions from '../actionTypes/LoginActionTypes';
import clone from 'lodash/clone';
import map from 'lodash/map';
import omit from 'lodash/omit';
import forEach from 'lodash/forEach'
import { getAstralObject } from '../reducers/spaceReducer'

export function getBase (state, id) {
    return state.entities.bases[id];
}

export function getInventory(state) {
    const base = getCurrentBase(state);
    return base ? base.inventory : null;
}

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

    const planet = getAstralObject(state, base.planet);

    return {...base, buildings, planet};
}

export function populateBuilding (state, building) {
    return {
        ...omit(state.entities.staticBuildings[building.buildingId], ['id']),
        ...building
    }
}

export function currentBase (state = {
    id:""
}, action) {
    switch(action.type) {
        case LoginActions.LOGOUT:
            return { id: ""};
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
        case LoginActions.LOGOUT:
            return {};
        case BaseActions.CREATE_BASE_SUCCESS:
        case BaseActions.FETCH_BASE_SUCCESS:

            // const bases = {};
            // forEach(action.payload.bases, (base, id) => {
            //     const inventory = {};
            //     forEach(base.inventory, (items, name) => {
            //         const newItems = {};
            //         items.forEach((item) => {
            //             newItems[item.templateId] = item;
            //         });
            //         inventory[name] = newItems;
            //     });
            //     bases[id] = {...base, inventory};
            // });

            return Object.assign({}, state, action.payload.bases);
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
                buildingPositions: { // TODO : is it still used ?
                    ...buildingPositions,
                    [action.meta.position]: action.payload.building.id
                }
            });
        case AppActions.REFRESH:

            const now = getServerTime();

            const base = clone(state);

            forEach(base.resources, (item, id) => {
                const deltaSeconds = (now - item.lastRefresh) / 1000;

                const productionForDeltaSeconds = item.production * deltaSeconds / 3600;

                const effectiveProduction = Math.min(productionForDeltaSeconds, item.maxVolume - item.count);

                item.count += effectiveProduction;
                item.lastRefresh = now;
            });

            return base;
        default:
            return state;
    }
}

export default base;
