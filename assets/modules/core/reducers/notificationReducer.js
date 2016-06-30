import * as BuildingActions from '../../buildings/actions/BuildingActionTypes'
import * as LoginActions from '../../auth/actions/LoginActionTypes';

export function getNotifications(state) {
    return state.notifications;
}

export function notifications(state = [], action) {
    switch(action.type) {
        case LoginActions.LOGOUT:
            return {};
        case BuildingActions.UPGRADE_BUILDING_FAILURE:
        case BuildingActions.CREATE_BUILDING_FAILURE:
            return [
                {
                    type: 'error',
                    date: Date.now(),
                    message: action.payload
                },
                ...state
            ];
            return state;
        default:
            return state;
    }
}