import { combineReducers } from 'redux';
import user from './modules/auth/reducers/userReducer';
import base from './modules/base/reducers/baseReducer';
import player from './modules/player/reducers/playerReducer';
import { staticBuildings } from './modules/static/reducers/staticReducer';
import { routerReducer } from 'react-router-redux'

export default combineReducers({ routing: routerReducer, user, base, player, staticBuildings });
