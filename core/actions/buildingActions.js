import * as BuildingActions from './../actionTypes/BuildingActionTypes';
import { postAsForm, fetch } from '../utils/post-as-form'
import config from '../config'
import addEvent from '../utils/addEvent'
import { fetchBaseSuccess, updateBase } from './baseActions'
import { normalize, arrayOf } from 'normalizr'
import { base } from 'schema/schemas'
import { notify } from './appActions'

function createModuleSuccess (base) {
    return {
        type: BuildingActions.CREATE_MODULE_SUCCESS,
        payload: {
            base
        }
    }
}

function createStructureSuccess (base) {
    return {
        type: BuildingActions.CREATE_STRUCTURE_SUCCESS,
        payload: {
            base
        }
    }
}

function attachModulesuccess (base) {
    return {
        type: BuildingActions.ATTACH_MODULE_SUCCESS,
        payload: {
            base
        }
    }
}

function createBuildingStart (base, building, meta) {
    return {
        type: BuildingActions.CREATE_BUILDING_START,
        payload: {
            base,
            building
        },
        meta: meta
    }
}

export function createBuildingEnd (base, building) {
    return {
        type: BuildingActions.CREATE_BUILDING_END,
        payload: {
            base,
            building
        }
    }
}

export function upgradeBuildingStart (base, building, startedAt, endsAt) {
    return {
        type: BuildingActions.UPGRADE_BUILDING_START,
        payload: {
            base,
            building
        },
        meta: {
            startedAt,
            endsAt
        }
    }
}

export function upgradeBuildingWait (base, building, event) {
    return {
        type: BuildingActions.UPGRADE_BUILDING_WAIT,
        payload: {
            base,
            building
        },
        meta: {
            event
        }
    }
}

export function upgradeBuildingEnd (base, building) {
    return {
        type: BuildingActions.UPGRADE_BUILDING_END,
        payload: {
            base,
            building
        }
    }
}

export function viewBuildingDetails ({ id, baseId }) {
    return {
        type: BuildingActions.SELECT_BUILDING,
        payload: {
            id: id,
            type: baseId ? "BUILDING_ENTITY" : "BUILDING_STATIC"
        }
    }
}

export function viewModuleDetails (building, module) {
    return {
        type: BuildingActions.SELECT_MODULE,
        payload: {
            id: module ? module : building.buildingId ? building.buildingId : building.id,
            type: module ? 'MODULE' : 'MODULE_LIST'
        }
    }
}

export function createBuilding (currentBase, { id }, position = -1) {
    return dispatch => {
        return postAsForm(config.api.url + '/building', { building: id, position })
            .catch(res => {
                dispatch(notify(res.meta && res.meta.message ? res.meta.message : 'An error occured'));
                return Promise.reject(res);
            })
            .then(res => {
                dispatch(
                    addEvent(
                        Date.now(),
                        res.payload.endsAt,
                        createBuildingStart(currentBase, res.payload, {position}),
                        [createBuildingEnd(currentBase, res.payload),updateBase(currentBase)])
                );
                try {
                    dispatch(fetchBaseSuccess(normalize(res.meta.base, base).entities));
                }catch (e) {
                    console.error(e);
                }
            })
    }
}

export function upgradeBuilding (currentBase, { id }) {
    return dispatch => {
        return postAsForm(config.api.url + '/building/' + id + '/upgrade')
            .catch(res => {
                dispatch(notify(res.meta && res.meta.message ? res.meta.message : 'An error occured'));
                return Promise.reject(res);
            })
            .then(res => {
                if (res.meta.queue.length === 0 ) {
                   console.warn("Meta queue empty after an upgrade ???");
                } else if (res.meta.queue.length === 1 ) {
                   dispatch(
                       addEvent(
                           Date.now(),
                           res.meta.queue[0].endsAt,
                           upgradeBuildingStart(currentBase, res.payload, Date.now(), res.meta.queue[0].endsAt),
                           [upgradeBuildingEnd(currentBase, res.payload), updateBase(currentBase)]
                       )
                   );
                } else { //res.meta.queue.length >= 2
                   dispatch(
                       addEvent(
                           res.meta.queue[res.meta.queue.length - 2].endsAt+1,
                           res.meta.queue[res.meta.queue.length - 1].endsAt,
                           upgradeBuildingStart(currentBase, res.payload, res.meta.queue[res.meta.queue.length - 2].endsAt+1, res.meta.queue[res.meta.queue.length - 1].endsAt),
                           [upgradeBuildingEnd(currentBase, res.payload), updateBase(currentBase)]
                       )
                   );
                   dispatch(upgradeBuildingWait(currentBase, res.payload, res.meta.queue[res.meta.queue.length - 1]))
                }
                try {
                    dispatch(fetchBaseSuccess(normalize(res.meta.base, base).entities));
                }catch (e) {
                    console.error(e);
                }
            })
    }
}

export function createModule (moduleId) {
    return dispatch => {
        return postAsForm(config.api.url + '/factory/module/create/' + moduleId)
            .catch(res => {
                dispatch(notify(res.meta && res.meta.message ? res.meta.message : 'An error occured'));
                return Promise.reject(res);
            })
            .then(res => {
                dispatch(createModuleSuccess(res.payload));
                dispatch(fetchBaseSuccess(normalize(res.payload, base).entities));
                dispatch(notify(moduleId + ' has been successfully created !'));
            })
    }
}

export function createStructure (structureId) {
    return dispatch => {
        return postAsForm(config.api.url + '/factory/structure/create/' + structureId)
            .catch(res => {
                dispatch(notify(res.meta && res.meta.message ? res.meta.message : 'An error occured'));
                return Promise.reject(res);
            })
            .then(res => {
                dispatch(createStructureSuccess(res.payload));
                dispatch(fetchBaseSuccess(normalize(res.payload, base).entities));
                dispatch(notify(structureId + ' has been successfully created !'));
            })
    }
}

export function attachModule ({ id: buildingId }, { templateId: moduleId }) {
    return dispatch => {
        return postAsForm(config.api.url + '/building/' + buildingId + '/attach/module/' + moduleId)
            .catch(res => {
                dispatch(notify(res.meta && res.meta.message ? res.meta.message : 'An error occured'));
                return Promise.reject(res);
            })
            .then(res => {
                dispatch(attachModulesuccess(res.payload));
                dispatch(fetchBaseSuccess(normalize(res.payload, base).entities));
                dispatch(notify(moduleId + ' has been successfully attached !'));
            })
    }
}