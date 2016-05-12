import * as StaticActionTypes from './StaticActionTypes';
import { postAsForm, fetch } from '../../../utils/post-as-form'
import { normalize, arrayOf } from 'normalizr'
import { staticBuilding, staticItem } from '../../../schema/schemas.js'
import config from '../../../config'


function fetchBuildingsSuccess (buildings) {
    return {
        type: StaticActionTypes.FETCH_BUILDINGS_SUCCESS,
        payload: buildings
    }
}

function fetchBuildingsFailure (message) {
    return {
        type: StaticActionTypes.FETCH_BUILDINGS_FAILURE,
        payload: { message }
    }
}

function fetchItemsSuccess (items) {
    return {
        type: StaticActionTypes.FETCH_ITEMS_SUCCESS,
        payload: items
    }
}

function fetchItemsFailure (message) {
    return {
        type: StaticActionTypes.FETCH_ITEMS_FAILURE,
        payload: { message }
    }
}

export function fetchBuildings () {
    return dispatch => {
        return fetch(config.api.url + '/building_static/')
            .then(res => {
                try {
                    dispatch(fetchBuildingsSuccess(normalize(res.payload, arrayOf(staticBuilding)).entities.staticBuildings));
                } catch (e) {
                    console.error(e);
                }
            })
            .catch(res => {
                dispatch(fetchBuildingsFailure(res.meta && res.meta.message ? res.meta.message : 'An error occured'));
            })
    };
}

export function fetchItems () {
    return dispatch => {
        return fetch(config.api.url + '/item_static/')
            .then(res => {
                try {
                    console.log(normalize(res.payload.RESOURCE, arrayOf(staticItem)));
                    dispatch(fetchItemsSuccess(normalize(res.payload, arrayOf(arrayOf(staticItem))).entities.staticItems));
                } catch (e) {
                    console.error(e);
                }
            })
            .catch(res => {
                dispatch(fetchItemsFailure(res.meta && res.meta.message ? res.meta.message : 'An error occured'));
            })
    };
}