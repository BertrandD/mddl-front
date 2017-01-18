import isFunction from 'lodash/isFunction'

const events = {};

const eventHandler = store => next => action => {
    if (events[action.type]) {
        events[action.type].forEach(cb => {
            if (isFunction(cb)) {
                setTimeout(() => {
                    cb(action);
                });
            }
        })
    }
    return next(action)
};

export function register(action, cb) {
    if (!events[action]) {
        events[action] = [];
    }
    events[action].push(cb);
}

export function unregister(action, cb) {
    if (events[action]) {
        events[action] = events[action].filter(c => c != cb)
    }
}

export default eventHandler;