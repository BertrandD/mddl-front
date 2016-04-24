import { CREATE_BUILDING_START, CREATE_BUILDING_END, CREATE_BUILDING_FAILURE, UPGRADE_BUILDING_END, UPGRADE_BUILDING_FAILURE, UPGRADE_BUILDING_START } from './BuildingActionTypes';
import { postAsForm, fetch } from '../../../utils/post-as-form'

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

function upgradeBuildingStart (base, building) {
    return {
        type: UPGRADE_BUILDING_START,
        payload: {
            base,
            building
        }
    }
}

function upgradeBuildingFailure (message) {
    return {
        type: UPGRADE_BUILDING_FAILURE,
        payload: message
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
        return postAsForm('http://localhost:8080/building', { building: id })
            .catch(res => {
                dispatch(createBuildingFailure(res.meta && res.meta.message ? res.meta.message : 'An error occured'))
                return Promise.reject();
            })
            .then(res => {
                res.payload.endsAt = Date.now() + 30000;

                setTimeout(() => {
                    dispatch(createBuildingEnd(currentBase, res.payload));
                }, res.payload.buildTime || 30000);

                dispatch(createBuildingStart(currentBase, res.payload));
            })
    }
}

export function upgradeBuilding (currentBase, { id }) {
    return dispatch => {
        return postAsForm('http://localhost:8080/building/' + id + '/upgrade')
            .catch(res => {
                dispatch(upgradeBuildingFailure(res.meta && res.meta.message ? res.meta.message : 'An error occured'))
                return Promise.reject();
            })
            .then(res => {
                res.payload.endsAt = Date.now() + 30000;

                setTimeout(() => {
                    dispatch(upgradeBuildingEnd(currentBase, res.payload));
                }, res.payload.buildTime || 30000);

                dispatch(upgradeBuildingStart(currentBase, res.payload));
            })
    }
}