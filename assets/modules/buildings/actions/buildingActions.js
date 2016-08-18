import { UPGRADE_BUILDING_WAIT, CREATE_BUILDING_START, CREATE_BUILDING_END, UPGRADE_BUILDING_END, UPGRADE_BUILDING_START, SELECT_BUILDING } from './BuildingActionTypes';
import { postAsForm, fetch } from '../../../utils/post-as-form'
import config from '../../../config'
import addEvent from '../../../utils/addEvent'
import { fetchBaseSuccess, updateBase } from './../../base/actions/baseActions'
import { normalize, arrayOf } from 'normalizr'
import { base } from '../../../schema/schemas'
import { notify } from '../../core/actions/appActions'

function createBuildingStart (base, building, meta) {
    return {
        type: CREATE_BUILDING_START,
        payload: {
            base,
            building
        },
        meta: meta
    }
}

export function createBuildingEnd (base, building) {
    return {
        type: CREATE_BUILDING_END,
        payload: {
            base,
            building
        }
    }
}

export function upgradeBuildingStart (base, building, startedAt, endsAt) {
    return {
        type: UPGRADE_BUILDING_START,
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
        type: UPGRADE_BUILDING_WAIT,
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
        type: UPGRADE_BUILDING_END,
        payload: {
            base,
            building
        }
    }
}

export function selectBuilding ({ id, baseId }) {
    return {
        type: SELECT_BUILDING,
        payload: {
            id: id,
            type: baseId ? "ENTITY" : "STATIC"
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
                setTimeout(() => {
                    dispatch(createBuildingEnd(currentBase, res.payload));
                    dispatch(updateBase(currentBase));
                }, res.payload.endsAt - Date.now());
                dispatch(createBuildingStart(currentBase, res.payload, {position}));
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

                if (res.meta.queue.length === 1 ) {
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