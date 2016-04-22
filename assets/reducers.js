import { combineReducers } from 'redux';
import user from './modules/auth/reducers/userReducer';
import base, {currentBase, bases} from './modules/base/reducers/baseReducer';
import player, {currentPlayer, players} from './modules/player/reducers/playerReducer';
import { staticBuildings } from './modules/static/reducers/staticReducer';
import { routerReducer } from 'react-router-redux'

const tt = combineReducers({staticBuildings, bases, players});

function entities(state = {
    staticBuildings: {},
    players: {},
    bases: {}
}, action) {
    if (action.payload && action.payload.entities) {
        return tt(Object.assign({}, state, action.payload.entities), Object.assign({}, action, {payload:action.payload.entities}));
    }

    return state;
}

const u = combineReducers({ routing: routerReducer, entities, user, currentBase, currentPlayer });

export default u;
