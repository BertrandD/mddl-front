import { combineReducers } from 'redux';
import user from 'reducers/userReducer';
import {currentBase, bases} from 'reducers/baseReducer';
import {buildings, selectedObject} from 'reducers/buildingReducer';
import player, {currentPlayer, players} from 'reducers/playerReducer';
import { staticBuildings, staticItems } from 'reducers/staticReducer';
import { routerReducer } from 'react-router-redux'
import { popup } from 'reducers/popupReducer'
import { privateMessages } from 'reducers/privateMessageReducer'
import { notifications } from 'reducers/notificationReducer'
import { shortcuts } from 'reducers/shortcutsReducer'
import { reports } from 'reducers/reportReducer'
import { space } from 'reducers/spaceReducer'
import { currentAction, loading } from 'reducers/loadingReducer'

const entities = combineReducers({staticBuildings, staticItems, bases, players, buildings, reports, space});

const u = combineReducers({ routing: routerReducer, entities, user, currentBase, selectedObject, currentPlayer, popup, notifications, privateMessages, shortcuts, loading, currentAction });

export default u;
