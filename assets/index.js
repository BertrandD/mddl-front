import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { createStore, applyMiddleware, compose, bindActionCreators } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux'
import { fetchAuthentication } from './modules/auth/actions/loginActions'
import { fetchPlayer } from './modules/player/actions/playerActions'
import { fetchMyBases } from './modules/base/actions/baseActions'
import { fetchBuildings } from './modules/static/actions/staticActions'

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

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

const actions = bindActionCreators({ fetchAuthentication, fetchMyBases, fetchPlayer, fetchBuildings }, store.dispatch);

actions.fetchBuildings();
actions.fetchAuthentication()
  .then(() => {
    actions.fetchPlayer().then(() => {
      actions.fetchMyBases()
    })
  });

function requireAuth(nextState, replace) {
  if (!store.getState().user.token) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

import App from './modules/App';
import rootReducer from './reducers';
import HomePage from './containers/HomePage';
import LoginContainer from './modules/auth/LoginContainer';
import BaseContainer from './modules/base/BaseContainer';
import PlayerCreationContainer from './modules/player/PlayerCreationContainer';
import BaseCreationContainer from './modules/base/BaseCreationContainer';
import BaseRight from './modules/base/components/BaseRight'

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} onEnter={requireAuth}>
        <IndexRoute components={{center: HomePage, right: HomePage}} />
        <Route path="home" components={{center: HomePage, right: HomePage}} />
        <Route path="base" components={{center: BaseContainer, right: BaseRight}} />

        <Route path="create/player" components={{center: PlayerCreationContainer, right: HomePage}} />
        <Route path="create/base" components={{center: BaseCreationContainer, right: HomePage}} />

      </Route>
      <Route path="/login" component={LoginContainer} />
    </Router>
  </Provider>,
  document.getElementById('app')
);
