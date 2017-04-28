import * as SpyActions from '../actionTypes/SpyActionTypes';
import * as AppAction from '../actionTypes/AppActionTypes';

export function isLoading(state, type) {
    return state.loading[type];
}

export function currentAction(state = [], action) {
    switch(action.type) {
        case AppAction.REFRESH:
        case "@@router/LOCATION_CHANGE":
            return state
        default:
            state = state.slice(Math.max(state.length - 5,0))
            state.push(action.type)
            return state
    }
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
