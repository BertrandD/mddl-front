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
            }, endsAt - getServerTime());
            dispatch(actionStart);
        }, start - getServerTime());

        dispatch({
            type: 'ADD_EVENT',
            payload: {
                start,
                endsAt,
                actionStart,
                actionEnd
            }
        })
    }
}