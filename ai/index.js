import 'babel-polyfill';
import { createStore, applyMiddleware, compose, bindActionCreators } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import thunkMiddleware from 'redux-thunk'
import isEmpty from 'lodash/isEmpty'
import eventHandler from './eventHandler'

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    var localStorage = new LocalStorage('./.scratch');
    global.localStorage = localStorage;
}

localStorage.setItem("token", "f4860f0c-9fff-45b8-8485-d381e4468d70");

function configureStore(initialState = {}) {
    const token = localStorage.token ? localStorage.token : localStorage.getItem("token");
    if (token) {
        initialState.user = {
            lang: 'en',
            token: token
        }
    }

    const logger = store => next => action => {
        console.log("▶ ", action.type);
        return next(action)
    };

    const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 });
    const store = createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(
            thunkMiddleware,
            logger,
            eventHandler
            ), f => f)
    );
    return store
}

import { fetchAuthentication } from './../core/actions/loginActions'
import { fetchPlayer, fetchAllPlayers, fetchAccount } from './../core/actions/playerActions'
import { fetchMyBases } from './../core/actions/baseActions'
import { fetchBuildings, fetchItems } from '../core/actions/staticActions'

const store = configureStore();

const actions = bindActionCreators({ fetchAuthentication, fetchMyBases, fetchPlayer, fetchAccount, fetchAllPlayers, fetchItems, fetchBuildings }, store.dispatch);

import rootReducer from './reducers';

const state = store.getState();
if (!state.user.token) {
    console.error("No user token");
    process.exit();
}

const promises = [];

if (!state.entities || !state.entities.staticBuildings || isEmpty(state.entities.staticBuildings)) {
    const p1 = actions.fetchBuildings();
    const p2 = actions.fetchItems();

    promises.push(p1);
    promises.push(p2);
}

if (!state.currentBase || !state.currentBase.id || isEmpty(state.currentBase.id)) {
    const p3 = actions.fetchPlayer().then(() => {
        actions.fetchMyBases()
    });
    promises.push(p3);
}

const p4 = actions.fetchAccount();
promises.push(p4);

Promise.all(promises).then(() => {

});
