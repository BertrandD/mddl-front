import { combineReducers } from 'redux';
import user from './modules/auth/reducers/userReducer';
import {currentBase, bases} from './modules/base/reducers/baseReducer';
import {buildings} from './modules/base/reducers/buildingReducer';
import player, {currentPlayer, players} from './modules/player/reducers/playerReducer';
import { staticBuildings, staticItems } from './modules/static/reducers/staticReducer';
import { routerReducer } from 'react-router-redux'
import { popup } from './modules/core/reducers/popupReducer'

const entities = combineReducers({staticBuildings, staticItems, bases, players, buildings});

const u = combineReducers({ routing: routerReducer, entities, user, currentBase, currentPlayer, popup });

export default u;
