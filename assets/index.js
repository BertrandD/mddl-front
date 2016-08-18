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
      token: localStorage.token
    }
  }
  const logger = createLogger({
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
import { fetchAuthentication } from './modules/auth/actions/loginActions'
import { fetchPlayer, fetchAllPlayers } from './modules/player/actions/playerActions'
import { fetchMyBases } from './modules/base/actions/baseActions'
import { fetchBuildings, fetchItems } from './modules/static/actions/staticActions'
import { refresh } from './modules/core/actions/appActions'

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

const actions = bindActionCreators({ fetchAuthentication, fetchMyBases, fetchPlayer, fetchAllPlayers, fetchItems, fetchBuildings, refresh }, store.dispatch);

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
        actions.fetchMyBases().then(() => {
          window.timer = setTimeout(refreshApp, 3000);
        })
      });
    promises.push(p3);
  }


  Promise.all(promises).then(() => {
    next();
  });
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
import BaseBuildingsContainer from './modules/base/BaseBuildingsContainer';
import PlayerCreationContainer from './modules/player/PlayerCreationContainer';
import PlayerProfileContainer from './modules/player/PlayerProfileContainer';
import BaseCreationContainer from './modules/base/BaseCreationContainer';
import PlanetContainer from './modules/core/components/Planet/PlanetContainer'
import BuildingDetailsContainer from './modules/buildings/BuildingDetailsContainer'

render(
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App} onEnter={requireFullAuth}>
          <IndexRoute components={{left: BaseStatContainer, center: PlanetContainer }} />

          <Route path="base" components={{left: BaseStatContainer, center: BaseContainer, right: BuildingDetailsContainer }} />
          <Route path="base/buildings" components={{left: BaseStatContainer, center: BaseBuildingsContainer }} />

          <Route path="friends" components={{center: PlayerProfileContainer }} onEnter={actions.fetchAllPlayers}/>
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
