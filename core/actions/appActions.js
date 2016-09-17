import * as Actions from './../actionTypes/AppActionTypes'
import { uid } from '../utils/utils'
import { postAsForm, fetch } from '../utils/post-as-form'
import { fetchItems, fetchBuildings } from 'actions/staticActions'
import config from '../config'

export function refresh() {
    return {
        type: Actions.REFRESH,
        payload: {}
    }
}

export function changeLanguage (lang) {
    return dispatch => {
        return postAsForm(config.api.url + '/lang', { lang })
            .then(res => {
                dispatch(fetchItems());
                dispatch(fetchBuildings());
                dispatch({
                    type: Actions.CHANGE_LANGUAGE,
                    payload: {
                        lang
                    }
                })
            })
            .catch(res => {
                dispatch(notify(res.meta && res.meta.message ? res.meta.message : 'Could not change language'))
            });
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