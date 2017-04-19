import { createStore, applyMiddleware, bindActionCreators } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import thunkMiddleware from 'redux-thunk'
import eventHandler from './eventHandler'
import rootReducer from './reducers';
import logger from './logger'

if (typeof localStorage === "undefined" || localStorage === null) {
    const LocalStorage = require('node-localstorage').LocalStorage;
    const localStorage = new LocalStorage('./.scratch');
    global.localStorage = localStorage;
}

localStorage.setItem("token", "8dab8e4c-ba39-4fa3-80fa-da1de2b766c4"); //TODO : move it away

function configureStore(initialState = {}) {
    const token = global.localStorage.token ? global.localStorage.token : global.localStorage.getItem("token");
    if (token) {
        initialState.user = {
            lang: 'en',
            token: token
        }
    }

    const lg = store => next => action => {
        logger.log("▶ " + action.type + (action.payload.message ? " ▶ " + JSON.stringify(action.payload.message,null,2) : ''));
        return next(action)
    };

    const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 });
    const store = createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(
            thunkMiddleware,
            lg,
            eventHandler
        ), f => f)
    );
    return store
}

import * as loginActions from 'actions/loginActions'
import * as playerActions from 'actions/playerActions'
import * as baseActions from 'actions/baseActions'
import * as staticActions from 'actions/staticActions'
import * as buildinActions from 'actions/buildingActions'

const store = configureStore()
const actions = bindActionCreators({
    ...staticActions,
    ...baseActions,
    ...loginActions,
    ...playerActions,
    ...buildinActions
}, store.dispatch);

import { getCurrentBase, getBase } from 'reducers/baseReducer';
import { getcurrentPlayer } from 'reducers/playerReducer';
import { getStaticBuildings } from 'reducers/staticReducer';
import isEmpty from 'lodash/isEmpty'


function run () {
    const state = store.getState();

    logger.log("Init from token...");

    if (!state.entities || !state.entities.staticBuildings || isEmpty(state.entities.staticBuildings)) {
        actions.fetchBuildings();
        actions.fetchItems();
    }

    if (!state.currentBase || !state.currentBase.id || isEmpty(state.currentBase.id)) {
        actions.fetchPlayer().then(() => {
            actions.fetchMyBases().then(() => {
                actions.selectBase(getBase(store.getState(), getcurrentPlayer(store.getState()).currentBase));
                actions.fetchBase(getCurrentBase(store.getState())).then(exec);
            });
        });
    }

    actions.fetchAccount();
}

import size from 'lodash/size'
import createBuilding from './behaviors/createBuilding'
import checkIfBuilding from './behaviors/checkIfBuilding'

function exec () {
    const player = gcp();
    const base = gcb();

    logger.log("Hi ! I am " + player.name + " ("+ player.id +")");
    logger.log("My base is " + base.name + " ("+ base.id +")");
    logger.log("I have "+ size(base.buildings) + " buildings");
    logger.log("I have "+ size(base.inventory) + " items in my inventory");

    logger.log("I'm gonna try to build a silo");

    const siloPresent = checkIfBuilding("silo")
    if (!siloPresent) {
        createBuilding("silo")
    }

}

function gcp() {
    return getcurrentPlayer(store.getState())
}
function gb(id) {
    return getBase(store.getState(),id)
}
function gcb() {
    return getCurrentBase(store.getState())
}

function gsb() {
    return getStaticBuildings(store.getState())
}

export default {
    store,
    actions,
    run,
    getCurrentBase: gcb,
    getBase: gb,
    getcurrentPlayer: gcp,
    getStaticBuildings: gsb
}
