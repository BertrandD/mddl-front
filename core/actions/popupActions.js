import * as PopupActions from './../actionTypes/PopupActionTypes'

export function openPopup(type, data) {
    return {
        type: PopupActions.OPEN_POPUP,
        payload: {
            type: type,
            data: data
        }
    }
}

export function closePopup() {
    return {
        type: PopupActions.CLOSE_POPUP,
        payload: {}
    }
}