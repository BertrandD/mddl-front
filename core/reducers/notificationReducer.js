import * as BuildingActions from '../actionTypes/BuildingActionTypes'
import * as LoginActions from '../actionTypes/LoginActionTypes';
import * as AppActions from '../actionTypes/AppActionTypes';

export function getNotifications(state) {
    return state.notifications;
}

export function notifications(state = {}, action) {
    switch(action.type) {
        case AppActions.CLOSE_NOTIF:
            const newState = {
                ...state
            };

            delete newState[action.payload.id];

            return newState;
        case AppActions.NOTIFY:
            return {
                ...state,
                [action.payload.id]: {
                    type: action.type,
                    date: Date.now(),
                    message: action.payload.message
                }
            };
        default:
            return state;
    }
}