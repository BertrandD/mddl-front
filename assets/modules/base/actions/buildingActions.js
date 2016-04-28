import { UPGRADE_BUILDING_WAIT, CREATE_BUILDING_START, CREATE_BUILDING_END, CREATE_BUILDING_FAILURE, UPGRADE_BUILDING_END, UPGRADE_BUILDING_FAILURE, UPGRADE_BUILDING_START } from './BuildingActionTypes';
import { postAsForm, fetch } from '../../../utils/post-as-form'
import config from '../../../config'
import addEvent from '../../../utils/addEvent'

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

function createBuildingFailure (message) {
    return {
        type: CREATE_BUILDING_FAILURE,
        payload: message
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

function upgradeBuildingFailure (message) {
    return {
        type: UPGRADE_BUILDING_FAILURE,
        payload: message
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

export function createBuilding (currentBase, { id }, position) {
    return dispatch => {
        return postAsForm(config.api.url + '/building', { building: id, position })
            .catch(res => {
                dispatch(createBuildingFailure(res.meta && res.meta.message ? res.meta.message : 'An error occured'));
                return Promise.reject();
            })
            .then(res => {
                setTimeout(() => {
                    dispatch(createBuildingEnd(currentBase, res.payload));
                }, res.payload.endsAt - Date.now());
                dispatch(createBuildingStart(currentBase, res.payload, {position}));
            })
    }
}

export function upgradeBuilding (currentBase, { id }) {
    return dispatch => {
        return postAsForm(config.api.url + '/building/' + id + '/upgrade')
            .catch(res => {
                dispatch(upgradeBuildingFailure(res.meta && res.meta.message ? res.meta.message : 'An error occured'));
                return Promise.reject();
            })
            .then(res => {

                if (res.meta.queue.length === 1 ) {
                    dispatch(
                        addEvent(
                            Date.now(),
                            res.meta.queue[0].endsAt,
                            upgradeBuildingStart(currentBase, res.payload, Date.now(), res.meta.queue[0].endsAt),
                            upgradeBuildingEnd(currentBase, res.payload)
                        )
                    );
                } else { //res.meta.queue.length >= 2
                    dispatch(
                        addEvent(
                            res.meta.queue[res.meta.queue.length - 2].endsAt+1,
                            res.meta.queue[res.meta.queue.length - 1].endsAt,
                            upgradeBuildingStart(currentBase, res.payload, res.meta.queue[res.meta.queue.length - 2].endsAt+1, res.meta.queue[res.meta.queue.length - 1].endsAt),
                            upgradeBuildingEnd(currentBase, res.payload)
                        )
                    );
                    dispatch(upgradeBuildingWait(currentBase, res.payload, res.meta.queue[res.meta.queue.length - 1]))
                }
            })
    }
}