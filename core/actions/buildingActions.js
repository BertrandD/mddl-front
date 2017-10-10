import * as BuildingActions from './../actionTypes/BuildingActionTypes';
import { postAsForm, put, fetch } from '../utils/post-as-form'
import config from '../config'
import addEvent from '../utils/addEvent'
import { fetchBase, updateBase } from './baseActions'
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
        return postAsForm(config.api.url + '/me/base/' + currentBase.id + '/building', { building: id, position })
            .catch(res => {
                dispatch(notify(res.meta && res.meta.message ? res.meta.message : 'An error occurred : ' + res));
                return Promise.reject(res);
            })
            .then(res => {
                dispatch(
                    addEvent(
                        getServerTime(),
                        res.endsAt,
                        createBuildingStart(currentBase, res, {position}),
                        [createBuildingEnd(currentBase, res),updateBase(currentBase)])
                );
                dispatch(fetchBase(currentBase));
                setTimeout(() => {
                    dispatch(fetchBase(currentBase));
                }, res.endsAt - getServerTime())
            })
    }
}

export function upgradeBuilding (currentBase, { id }) {
    return dispatch => {
        return put(config.api.url + '/me/base/' + currentBase.id + '/building/' + id + '/upgrade')
            .catch(res => {
                dispatch(notify(res.meta && res.meta.message ? res.meta.message : 'An error occurred : ' + res));
                return Promise.reject(res);
            })
            .then(res => {
/*
                if (res.queue.length === 0 ) {
                   console.warn("Meta queue empty after an upgrade ???");
                } else if (res.queue.length === 1 ) {
*/
                   dispatch(
                       addEvent(
                           getServerTime(),
                           res.endsAt,
                           upgradeBuildingStart(currentBase, res, getServerTime(), res.endsAt),
                           [upgradeBuildingEnd(currentBase, res), updateBase(currentBase)]
                       )
                   );
/*
                } else { //res.queue.length >= 2
                   dispatch(
                       addEvent(
                           res.queue[res.queue.length - 2].endsAt+1,
                           res.queue[res.queue.length - 1].endsAt,
                           upgradeBuildingStart(currentBase, res, res.queue[res.queue.length - 2].endsAt+1, res.queue[res.queue.length - 1].endsAt),
                           [upgradeBuildingEnd(currentBase, res), updateBase(currentBase)]
                       )
                   );
                   dispatch(upgradeBuildingWait(currentBase, res, res.queue[res.queue.length - 1]))
                }
*/
                try {
                    dispatch(fetchBase(currentBase));
                }catch (e) {
                    console.error(e);
                }
            })
    }
}

export function createModule (base, building, moduleId) {
    return dispatch => {
        return postAsForm(config.api.url + '/me/base/' + base.id + '/factory/' + building.id + '/create/module/' + moduleId)
            .catch(res => {
                dispatch(notify(res.meta && res.meta.message ? res.meta.message : 'An error occurred : ' + res));
                return Promise.reject(res);
            })
            .then(res => {
                dispatch(createModuleSuccess(res.payload));
                dispatch(fetchBase(base));
                dispatch(notify(moduleId + ' has been successfully created !'));
            })
    }
}

export function createStructure (base, building, structureId) {
    return dispatch => {
        return postAsForm(config.api.url + '/me/base/' + base.id + '/factory/' + building.id + '/create/structure/' + structureId)
            .catch(res => {
                dispatch(notify(res.meta && res.meta.message ? res.meta.message : 'An error occurred : ' + res));
                return Promise.reject(res);
            })
            .then(res => {
                dispatch(createStructureSuccess(res.payload));
                dispatch(fetchBase(base));
                dispatch(notify(structureId + ' has been successfully created !'));
            })
    }
}

export function attachModule ({ id: buildingId }, { itemId: moduleId }) {
    return dispatch => {
        return postAsForm(config.api.url + '/building/' + buildingId + '/attach/module/' + moduleId)
            .catch(res => {
                dispatch(notify(res.meta && res.meta.message ? res.meta.message : 'An error occurred : ' + res));
                return Promise.reject(res);
            })
            .then(res => {
                dispatch(attachModulesuccess(res.payload));
                dispatch(fetchBase(base));
                dispatch(notify(moduleId + ' has been successfully attached !'));
            })
    }
}