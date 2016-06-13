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
import { fetchPlayer } from './modules/player/actions/playerActions'
import { fetchMyBases } from './modules/base/actions/baseActions'
import { fetchBuildings, fetchItems } from './modules/static/actions/staticActions'
import { refresh } from './modules/core/actions/appActions'

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

const actions = bindActionCreators({ fetchAuthentication, fetchMyBases, fetchPlayer, fetchItems, fetchBuildings, refresh }, store.dispatch);

actions.fetchAuthentication()
    .then(() => {
      actions.fetchPlayer().then(() => {
        actions.fetchMyBases().then(() => {
          window.timer = setTimeout(refreshApp, 3000);
        })
      });
      renderApp();

    })
    .catch(() => {
      renderApp();
    });

function refreshApp() {
  actions.refresh();
  window.timer = setTimeout(refreshApp, 3000);
}

function requireAuth(nextState, replace, next) {
  console.log('requireAuth');
  const state = store.getState();
  if (!state.user.token) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }

  if (!state.entities || !state.entities.staticBuildings || isEmpty(state.entities.staticBuildings)) {
    const p1 = actions.fetchBuildings();
    const p2 = actions.fetchItems();

    Promise.all([p1, p2]).then(() => {
      next();
    });
  }
}

import App from './modules/App';
import rootReducer from './reducers';
import HomePage from './containers/HomePage';
import LoginContainer from './modules/auth/LoginContainer';
import BaseContainer from './modules/base/BaseContainer';
import PlayerCreationContainer from './modules/player/PlayerCreationContainer';
import BaseCreationContainer from './modules/base/BaseCreationContainer';
import Planet from './modules/core/components/Planet/Planet'

function renderApp() {
  render(
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={App} onEnter={requireAuth}>
            <IndexRoute components={{center: HomePage, right: HomePage}} />
            <Route path="home" components={{center: HomePage, right: HomePage}} />
            <Route path="planet" components={{center: Planet}} />
            <Route path="base" components={{center: BaseContainer}} />

            <Route path="create/player" components={{center: PlayerCreationContainer, right: HomePage}} />
            <Route path="create/base" components={{center: BaseCreationContainer, right: HomePage}} />

          </Route>
          <Route path="/login" component={LoginContainer} />
        </Router>
      </Provider>,
      document.getElementById('app')
  );
}
