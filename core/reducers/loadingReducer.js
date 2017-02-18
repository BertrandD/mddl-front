import * as SpyActions from '../actionTypes/SpyActionTypes';

export function isLoading(state, type) {
    return state.loading[type];
}

export function loading(state = {}, action) {
    switch(action.type) {
        case SpyActions.FETCH_REPORT_START:
            return {
                ...state,
                reports: true
            };
        case SpyActions.FETCH_REPORT_SUCCESS:
            return {
                ...state,
                reports: false
            };
        default:
            return state;
    }
}


export default loading;
