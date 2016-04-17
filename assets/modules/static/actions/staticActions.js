import { FETCH_BUILDINGS_SUCCESS, FETCH_BUILDINGS_FAILURE } from './StaticActionTypes';
import { postAsForm, fetch } from '../../../utils/post-as-form'
import { push } from 'react-router-redux'

function fetchBuildingsSuccess (buildings) {
    return {
        type: FETCH_BUILDINGS_SUCCESS,
        payload: buildings
    }
}

function fetchBuildingsFailure (message) {
    return {
        type: FETCH_BUILDINGS_FAILURE,
        payload: { message }
    }
}

export function fetchBuildings () {
    return dispatch => {
        return fetch('http://localhost:8080/building_static/')
            .then(res => {
                dispatch(fetchBuildingsSuccess(res.payload));
            })
            .catch(res => {
                dispatch(fetchBuildingsFailure(res.meta && res.meta.message ? res.meta.message : 'An error occured'));
            })
    };
}