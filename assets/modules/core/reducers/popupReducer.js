import * as PopupActions from '../actions/PopupActionTypes'

export function popup(state = {}, action) {
    switch(action.type) {
        case PopupActions.OPEN_POPUP:
            return {
                ...state,
                type: action.payload.type,
                data: action.payload.data
            };
        case PopupActions.CLOSE_POPUP:
            return {
                type: null,
                data: null
            };
        default:
            return state;
    }
}