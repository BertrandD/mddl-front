export default function (start, endsAt, actionStart, actionEnd) {
    return dispatch => {
        setTimeout(() => {
            setTimeout(() => {
                if (Array.isArray(actionEnd)) {
                    actionEnd.forEach((action) => {
                        dispatch(action);
                    })
                } else {
                    dispatch(actionEnd);
                }
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