import 'babel-polyfill';
import { createStore, applyMiddleware, compose, bindActionCreators } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import thunkMiddleware from 'redux-thunk'
import isEmpty from 'lodash/isEmpty'
import eventHandler from './eventHandler'
import logger from './logger'


if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    var localStorage = new LocalStorage('./.scratch');
    global.localStorage = localStorage;
}

localStorage.setItem("token", "eb1a8cc1-2652-4272-9c42-226406ce5725");
logger.log('\x1Bc');

logger.log("********************");
logger.log("   Middlewar AI     ");
logger.log("********************");

function configureStore(initialState = {}) {
    const token = localStorage.token ? localStorage.token : localStorage.getItem("token");
    if (token) {
        initialState.user = {
            lang: 'en',
            token: token
        }
    }

    const lg = store => next => action => {
        logger.debug("▶ "+action.type);
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

import { fetchAuthentication } from './../core/actions/loginActions'
import { fetchPlayer, fetchAllPlayers, fetchAccount } from './../core/actions/playerActions'
import { fetchMyBases, selectBase, fetchBase } from './../core/actions/baseActions'
import { fetchBuildings, fetchItems } from '../core/actions/staticActions'
import { createBuilding } from './../core/actions/buildingActions'

const store = configureStore();

const actions = bindActionCreators({
    fetchAuthentication,
    fetchMyBases,
    selectBase,
    fetchBase,
    fetchPlayer,
    fetchAccount,
    fetchAllPlayers,
    fetchItems,
    fetchBuildings,
    createBuilding
}, store.dispatch);

import rootReducer from './reducers';
import { getCurrentBase, getBase } from './../core/reducers/baseReducer';
import { getcurrentPlayer } from './../core/reducers/playerReducer';
import { getStaticBuildings } from './../core/reducers/staticReducer';

const state = store.getState();
if (!state.user.token) {
    logger.error("No user token");
    process.exit();
}

logger.log("Init from token...");

if (!state.entities || !state.entities.staticBuildings || isEmpty(state.entities.staticBuildings)) {
    actions.fetchBuildings();
    actions.fetchItems();
}

if (!state.currentBase || !state.currentBase.id || isEmpty(state.currentBase.id)) {
    actions.fetchPlayer().then(() => {
        actions.fetchMyBases().then(() => {
            actions.selectBase(getBase(store.getState(), getcurrentPlayer(store.getState()).currentBase));
            actions.fetchBase(getCurrentBase(store.getState())).then(run);
        });
    });
}

actions.fetchAccount();

import * as buildingActionTypes from './../core/actionTypes/BuildingActionTypes';
import * as appActionTypes from './../core/actionTypes/AppActionTypes';

import { register } from './eventHandler'

import size from 'lodash/size'

function run() {
    const player = getcurrentPlayer(store.getState());
    const base = getCurrentBase(store.getState());
    const sBuildings = getStaticBuildings(store.getState());

    logger.log("Hi ! I am " + player.name + " ("+ player.id +")");
    logger.log("My base is " + base.name + " ("+ base.id +")");
    logger.log("I have "+ size(base.buildings) + " buildings");
    logger.log("I have "+ size(base.inventory) + " items in my inventory");

    logger.log("I'm gonna try to build a mine");
    actions.createBuilding(base, sBuildings["mine"]).catch((e) => {
        logger.error("Something went wrong... I canot build a mine... Error is : " );
        logger.error(e);
    });

    register(buildingActionTypes.CREATE_BUILDING_START, (action) => {
       logger.log("Great ! My storage is under construction !");
       const endsAt = action.payload.building.endsAt;
       logger.debug("endsAt="+endsAt);
       const buildingId = action.payload.building.id;
       logger.debug("buildingId="+buildingId);
       const wait = endsAt - Date.now();
       logger.log("I'll wait " + wait + "ms...");
       setTimeout(() => {
           logger.log("OK. Now my buildings should be available.");
           const check = store.getState().entities.buildings[buildingId].endsAt;
           if (check <= 0 ) {
               logger.log("Perfect ! ")
           } else {
               logger.log("Hum... check="+check);
           }
       }, wait);
    });



    register(buildingActionTypes.CREATE_BUILDING_END, (action) => {
        const building = action.payload.building;
        logger.log(building.buildingId+" (lvl " + (building.currentLevel+1) + ") is available !")
    });

    register(buildingActionTypes.UPGRADE_BUILDING_END, (action) => {
        const building = action.payload.building;
        logger.log(building.buildingId+" (lvl " + (building.currentLevel+1) + ") is available !")
    })

    register(appActionTypes.NOTIFY, (action) => {
        logger.log("Notification : "+action.payload.message)
    })

}
