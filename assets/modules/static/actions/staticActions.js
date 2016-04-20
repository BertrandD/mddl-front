import { FETCH_BUILDINGS_SUCCESS, FETCH_BUILDINGS_FAILURE } from './StaticActionTypes';
import { postAsForm, fetch } from '../../../utils/post-as-form'
import { normalize, arrayOf } from 'normalizr'
import staticBuilding from '../../../shema/staticBuilding'


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
                try {
                    dispatch(fetchBuildingsSuccess(normalize(res.payload, arrayOf(staticBuilding))));
                } catch (e) {
                    console.error(e);
                }
            })
            .catch(res => {
                dispatch(fetchBuildingsFailure(res.meta && res.meta.message ? res.meta.message : 'An error occured'));
            })
    };
}