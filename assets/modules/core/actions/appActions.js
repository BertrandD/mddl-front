import * as Actions from './AppActionTypes'

export function refresh() {
    return {
        type: Actions.REFRESH,
        payload: {}
    }
}