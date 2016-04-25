export default function (start, endsAt, actionStart, actionEnd) {
    return dispatch => {
        setTimeout(() => {
            setTimeout(() => {
                dispatch(actionEnd);
            }, endsAt - Date.now());
            dispatch(actionStart);
        }, start - Date.now());

        return {
            type: 'ADD_EVENT',
            payload: {
                start,
                endsAt,
                actionStart,
                actionEnd
            }
        }
    }
}