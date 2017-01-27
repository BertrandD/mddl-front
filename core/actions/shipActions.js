import * as ShipActions from './../actionTypes/ShipActionTypes';
import { postAsForm, fetch } from '../utils/post-as-form'
import config from '../config'
import { fetchBaseSuccess, updateBase } from './baseActions'
import { normalize, arrayOf } from 'normalizr'
import { base } from 'schema/schemas'
import { notify } from './appActions'

function createShipSuccess(ship) {
    return {
        type: ShipActions.CREATE_SHIP_SUCCESS,
        payload: {
            ship
        }
    }
}

export function createShip(itemId, count, attachments) {
    return dispatch => {
        return postAsForm(config.api.url + '/ship', {
            structureId: itemId,
            count,
            attachments
        })
            .catch(res => {
                dispatch(notify(res.meta && res.meta.message ? res.meta.message : 'An error occured'));
                return Promise.reject(res);
            })
            .then(res => {
                dispatch(createShipSuccess(res.payload));
                dispatch(fetchBaseSuccess(normalize(res.meta.base, base).entities));
                dispatch(notify(count + ' ' + itemId + ' has been successfully created !'));
            })
    }
}