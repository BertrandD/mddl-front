import * as Actions from './AppActionTypes'
import { uid } from '../../../utils/utils'

export function refresh() {
    return {
        type: Actions.REFRESH,
        payload: {}
    }
}

export function notify(message, type) {
    return dispatch => {
        const id = uid();

        setTimeout(() => {
            dispatch(closeNotif(id));
        }, 15000);

        return dispatch({
            type: Actions.NOTIFY,
            payload: {
                message,
                id,
                type
            }
        });
    }
}

export function closeNotif(id) {
    return {
        type: Actions.CLOSE_NOTIF,
        payload: {
            id
        }
    }
}