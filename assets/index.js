import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux'

import App from './containers/App';
import rootReducer from './reducers';
import LoginPage from './containers/LoginPage';

const logger = store => next => action => {
  console.group(action.type);
  console.info('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  console.groupEnd(action.type);
  return result
};

function configureStore(initialState = {}) {

  if (localStorage.token) {
    initialState.user = {
      token: localStorage.token
    }
  }

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      thunkMiddleware,
      logger,
      routerMiddleware(browserHistory)
    )
  )

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

function requireAuth(nextState, replace) {
  if (!store.getState().user.token) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} onEnter={requireAuth}>
      </Route>
      <Route path="/login" component={LoginPage}>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
