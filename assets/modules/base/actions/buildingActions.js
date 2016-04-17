import { CREATE_BUILDING_SUCCESS, CREATE_BUILDING_FAILURE } from './BuildingActionTypes';
import { postAsForm, fetch } from '../../../utils/post-as-form'

function createBuildingSuccess (building) {
    return {
        type: CREATE_BUILDING_SUCCESS,
        payload: building
    }
}

function createBuildingFailure (message) {
    return {
        type: CREATE_BUILDING_FAILURE,
        payload: message
    }
}

export function createBuilding ({ id }) {
    return dispatch => {
        return postAsForm('http://localhost:8080/building', { building: id })
            .catch(res => {
                dispatch(createBuildingFailure(res.meta && res.meta.message ? res.meta.message : 'An error occured'))
            })
            .then(res => {
                dispatch(createBuildingSuccess(res.payload))
            })
    }
}