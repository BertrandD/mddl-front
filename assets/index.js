import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { createStore, applyMiddleware, compose, bindActionCreators } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux'
import isEmpty from 'lodash/isEmpty'

function configureStore(initialState = {}) {

  if (localStorage.token) {
    initialState.user = {
      lang: 'en',
      token: localStorage.token
    }
  }
  const logger = createLogger({
      predicate: (getState, action) => action.type !== 'REFRESH',
    collapsed: true
  });

  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(
        thunkMiddleware,
        routerMiddleware(browserHistory),
        logger
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f)

  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
import * as loginActions from './../core/actions/loginActions'
import * as playerActions from './../core/actions/playerActions'
import * as baseActions from './../core/actions/baseActions'
import * as staticActions from '../core/actions/staticActions'
import * as appActions from './../core/actions/appActions'
import * as privateMessagesActions from './../core/actions/privateMessagesActions'
import * as reportsActions from '../core/actions/reportsActions'
import * as spaceActions from '../core/actions/spaceActions'

import { getBase } from './../core/reducers/baseReducer'
import { getcurrentPlayer } from './../core/reducers/playerReducer'
import { push } from 'react-router-redux'
window.push = push;

const store = configureStore();
window.store = store;
const history = syncHistoryWithStore(browserHistory, store);

const actions = bindActionCreators({
    ...loginActions,
    ...playerActions,
    ...baseActions,
    ...staticActions,
    ...appActions,
    ...privateMessagesActions,
    ...reportsActions,
    ...spaceActions
}, store.dispatch);
window.actions = actions;

import * as baseReducer from '../core/reducers/baseReducer'
import * as buildingReducer from '../core/reducers/buildingReducer'
import * as loadingReducer from '../core/reducers/loadingReducer'
import * as notificationReducer from '../core/reducers/notificationReducer'
import * as playerReducer from '../core/reducers/playerReducer'
import * as popupReducer from '../core/reducers/popupReducer'
import * as privateMessageReducer from '../core/reducers/privateMessageReducer'
import * as reportReducer from '../core/reducers/reportReducer'
import * as shortcutsReducer from '../core/reducers/shortcutsReducer'
import * as spaceReducer from '../core/reducers/spaceReducer'
import * as staticReducer from '../core/reducers/staticReducer'
import * as userReducer from '../core/reducers/userReducer'

window.store = {
    ...store,
    ...baseReducer,
    ...buildingReducer,
    ...loadingReducer,
    ...notificationReducer,
    ...playerReducer,
    ...popupReducer,
    ...privateMessageReducer,
    ...playerReducer,
    ...reportReducer,
    ...shortcutsReducer,
    ...spaceReducer,
    ...staticReducer,
    ...userReducer
};

window.initConsole = function () {
  window.base = window.store.getPopulatedCurrentBase(window.store.getState());
  window.player = window.store.getcurrentPlayer(window.store.getState());
    console.log("### Console initiated");
};

function requireSimpleAuth (nextState, replace, next) {
  const state = store.getState();
  if (!state.user.token) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
  }
  next();
}

function requireFullAuth(nextState, replace, next) {
  const state = store.getState();
  if (!state.user.token) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
    next();
    return;
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
        return actions.fetchMyBases().then(() => {
          const base = getBase(store.getState(), getcurrentPlayer(store.getState()).currentBase);
            actions.selectBase(base);
            return actions.fetchBase(base).then(() => {
                window.timer = setTimeout(refreshApp, 3000);
                initConsole();
            });
        })
      });
    promises.push(p3);
  }

  const p4 = actions.fetchAccount();
  promises.push(p4);


  Promise.all(promises).then(() => {
    next();
  });
}

function requireSystemFetched(nextState, replace, next) {
  const promise = actions.fetchMyStar();
  Promise.all([promise]).then(() => {
    next();
  })
}

function refreshApp() {
  actions.refresh();
  window.timer = setTimeout(refreshApp, 3000);
}


import App from './modules/App';
import rootReducer from './reducers';
import LoginContainer from './modules/auth/LoginContainer';
import BaseContainer from './modules/base/BaseContainer';
import BaseStatContainer from './modules/base/BaseStatContainer';
import SystemContainer from './modules/system/SystemContainer';
import InventoryContainer from './modules/inventory/InventoryContainer';
import PlayerCreationContainer from './modules/player/PlayerCreationContainer';
import PlayerProfileContainer from './modules/player/PlayerProfileContainer';
import BaseCreationContainer from './modules/base/BaseCreationContainer';
import PlanetContainer from './modules/core/components/Planet/PlanetContainer'
import ObjectDetailsContainer from './modules/buildings/ObjectDetailsContainer'
import BuildingPageContainer from './modules/buildings/BuildingPageContainer'
import PrivateMessageContainer from './modules/privateMessages/PrivateMessageContainer'
import SendPrivateMessageContainer from './modules/privateMessages/SendPrivateMessageContainer'
import ReportsContainer from './modules/reports/ReportsContainer'

render(
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App} onEnter={requireFullAuth}>
          <IndexRoute components={{left: BaseStatContainer, center: PlanetContainer }} />

          <Route path="base" components={{left: BaseStatContainer, center: BaseContainer, right: ObjectDetailsContainer }} />
          <Route path="base/inventory" components={{left: BaseStatContainer, center: InventoryContainer, right: ObjectDetailsContainer }} />
          <Route path="base/buildings/:buildingId" components={{left: BaseStatContainer, center: BuildingPageContainer }} />

          <Route path="friends" components={{center: PlayerProfileContainer }} onEnter={actions.fetchAllPlayers}/>
          <Route path="messenger" components={{center: PrivateMessageContainer }} onEnter={actions.fetchMessages}/>
          <Route path="messenger/send" components={{center: SendPrivateMessageContainer }} onEnter={actions.fetchAllPlayers}/>

          <Route path="system" components={{left: BaseStatContainer, center: SystemContainer }} onEnter={requireSystemFetched}/>

          <Route path="reports" components={{left: BaseStatContainer, center: ReportsContainer }} onEnter={actions.fetchReports}/>
        </Route>
        <Route path="/create" component={App} onEnter={requireSimpleAuth}>

          <Route path="player" components={{center: PlayerCreationContainer}} />
          <Route path="base" components={{center: BaseCreationContainer}} />

        </Route>
        <Route path="/login" component={LoginContainer} />
      </Router>
    </Provider>,
    document.getElementById('app')
);
