import { FETCH_BASE_FAILURE, FETCH_BASE_REQUEST, FETCH_BASE_SUCCESS } from './BaseActionTypes';
import { postAsForm, fetch } from '../../../utils/post-as-form'

function fetchBaseSuccess (base) {
    return {
        type: FETCH_BASE_SUCCESS,
        payload: base
    }
}

function fetchBaseFailure (message) {
    return {
        type: FETCH_BASE_FAILURE,
        payload: { message }
    }
}

export function fetchBase (user) {
    return dispatch => {
        return fetch('http://localhost:8080/base/570c0780acc8499ceefa7a69')
            .then(res => {
                dispatch(fetchBaseSuccess(res.payload));
            })
            .catch(res => {
                dispatch(fetchBaseFailure(res.meta.message ? res.meta.message : 'An error occured'));
            })
    };
}