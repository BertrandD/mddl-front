import { combineReducers } from 'redux';
import user from './modules/auth/reducers/userReducer';
import base, {currentBase, bases} from './modules/base/reducers/baseReducer';
import player, {currentPlayer, players} from './modules/player/reducers/playerReducer';
import { staticBuildings } from './modules/static/reducers/staticReducer';
import { routerReducer } from 'react-router-redux'

const entitiesReducer = customCombineReducer({staticBuildings, bases, players});

function customCombineReducer(reducers) {
    return (state, action) => {
        let newState = Object.assign({}, state);
        Object.keys(action.payload.entities).forEach((key) => {
            let t = {};
            t[key] = reducers[key](action.payload.entities[key], Object.assign({}, action, {
                payload: action.payload.entities[key]
            }));
            newState = Object.assign(newState, t);
        });
        return newState;
    }
}

function entities(state = {
    staticBuildings: {},
    players: {},
    bases: {}
}, action) {
    if (action.payload && action.payload.entities) {
        return entitiesReducer(state, action);
    }

    return state;
}

const u = combineReducers({ routing: routerReducer, entities, user, currentBase, currentPlayer });

export default u;
