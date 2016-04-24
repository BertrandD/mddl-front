import { UPGRADE_BUILDING_WAIT, CREATE_BUILDING_START, CREATE_BUILDING_END, CREATE_BUILDING_FAILURE, UPGRADE_BUILDING_END, UPGRADE_BUILDING_FAILURE, UPGRADE_BUILDING_START } from './BuildingActionTypes';
import { postAsForm, fetch } from '../../../utils/post-as-form'
import config from '../../../config'

function createBuildingStart (base, building) {
    return {
        type: CREATE_BUILDING_START,
        payload: {
            base,
            building
        }
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

function upgradeBuildingStart (base, building, queue) {
    return {
        type: UPGRADE_BUILDING_START,
        payload: {
            base,
            building
        },
        meta: {
            queue
        }
    }
}

function upgradeBuildingFailure (message) {
    return {
        type: UPGRADE_BUILDING_FAILURE,
        payload: message
    }
}

function upgradeBuildingWait (base, building, event) {
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

export function createBuilding (currentBase, { id }) {
    return dispatch => {
        return postAsForm(config.api.url + '/building', { building: id })
            .catch(res => {
                dispatch(createBuildingFailure(res.meta && res.meta.message ? res.meta.message : 'An error occured'))
                return Promise.reject();
            })
            .then(res => {
                setTimeout(() => {
                    dispatch(createBuildingEnd(currentBase, res.payload));
                }, res.payload.endsAt - Date.now());
                dispatch(createBuildingStart(currentBase, res.payload));
            })
    }
}

export function upgradeBuilding (currentBase, { id }) {
    return dispatch => {
        return postAsForm(config.api.url + '/building/' + id + '/upgrade')
            .catch(res => {
                dispatch(upgradeBuildingFailure(res.meta && res.meta.message ? res.meta.message : 'An error occured'))
                return Promise.reject();
            })
            .then(res => {

                if (res.meta.queue.length === 1 ) {
                    dispatch(
                        addEvent(
                            Date.now(),
                            res.meta.queue[0].endsAt,
                            upgradeBuildingStart(currentBase, res.payload, res.meta.queue),
                            upgradeBuildingEnd(currentBase, res.payload)
                        )
                    );
                } else { //res.meta.queue.length >= 2
                    dispatch(
                        addEvent(
                            res.meta.queue[res.meta.queue.length - 2].endsAt+1,
                            res.meta.queue[res.meta.queue.length - 1].endsAt,
                            upgradeBuildingStart(currentBase, res.payload, res.meta.queue),
                            upgradeBuildingEnd(currentBase, res.payload)
                        )
                    );
                    dispatch(upgradeBuildingWait(currentBase, res.payload, res.meta.queue[res.meta.queue.length - 1]))
                }
            })
    }
}

function addEvent(start, endsAt, actionStart, actionEnd) {
    return dispatch => {
        setTimeout(() => {
            setTimeout(() => {
                dispatch(actionEnd);
            }, endsAt - Date.now());
            dispatch(actionStart);
        }, start - Date.now());

        return {
            type: 'ADD_EVENT',
            payload: {
                start,
                endsAt,
                actionStart,
                actionEnd
            }
        }
    }
}