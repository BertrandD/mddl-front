import * as actions from './../actionTypes/SpyActionTypes';
import { fetch } from '../utils/post-as-form'
import { normalize, arrayOf } from 'normalizr'
import { report } from 'schema/schemas.js'
import config from '../config'
import { notify } from './appActions'


export function fetchReportSuccess(report) {
    return {
        type: actions.FETCH_REPORT_SUCCESS,
        payload: report
    }
}

export function fetchReportStart() {
    return {
        type: actions.FETCH_REPORT_START,
        payload: {}
    }
}

export function spyBaseSuccess(report) {
    return {
        type: actions.SPY_BASE_SUCCESS,
        payload: report
    }
}

export function fetchReports() {
    return dispatch => {
        dispatch(fetchReportStart());
        return fetch(config.api.url + '/reports')
            .then(res => {
                dispatch(fetchReportSuccess(normalize(res.payload, arrayOf(report)).entities));
            })
    }
}

export function spyBase(baseId) {
    return dispatch => {
        return fetch(config.api.url + '/base/spy/' + baseId)
            .then(res => {
                dispatch(spyBaseSuccess(normalize(res.payload, report).entities));
                dispatch(notify("Spy report is in your mailbox !"));
            })
    }
}

