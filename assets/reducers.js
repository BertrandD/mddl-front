import { combineReducers } from 'redux';
import user from './modules/auth/reducers/userReducer';
import base from './modules/base/reducers/baseReducer';
import player from './modules/player/reducers/playerReducer';
import { staticBuildings } from './modules/static/reducers/staticReducer';
import { routerReducer } from 'react-router-redux'

const tt = combineReducers({staticBuildings});

function entities(state = {
    staticBuildings: []
}, action) {
    if (action.payload && action.payload.entities) {
        return tt(Object.assign({}, state, action.payload.entities), action);
    }

    return state;
}

const u = combineReducers({ routing: routerReducer, entities, user, base, player });
console.log('----------------------');
export default u;
