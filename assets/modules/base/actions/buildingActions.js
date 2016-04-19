import { CREATE_BUILDING_START, CREATE_BUILDING_END, CREATE_BUILDING_FAILURE } from './BuildingActionTypes';
import { postAsForm, fetch } from '../../../utils/post-as-form'

function createBuildingStart (building) {
    return {
        type: CREATE_BUILDING_START,
        payload: building
    }
}

function createBuildingFailure (message) {
    return {
        type: CREATE_BUILDING_FAILURE,
        payload: message
    }
}

function createBuildingEnd (building) {
    return {
        type: CREATE_BUILDING_END,
        payload: building
    }
}

export function createBuilding ({ id }) {
    return dispatch => {
        return postAsForm('http://localhost:8080/building', { building: id })
            .catch(res => {
                dispatch(createBuildingFailure(res.meta && res.meta.message ? res.meta.message : 'An error occured'))
            })
            .then(res => {
                dispatch(createBuildingStart(res.payload));
                setTimeout(() => {
                    dispatch(createBuildingEnd(res.payload))
                }, res.payload.buildTime || 3000)
            })
    }
}