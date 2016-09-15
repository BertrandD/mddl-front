import * as LoginActions from '../actionTypes/LoginActionTypes';

export function getUser (state) {
  return state.user;
}

function user (state = {}, action) {
  switch (action.type) {
    case LoginActions.LOGOUT:
        localStorage.token = '';
      return {};
    case LoginActions.FETCH_LOGIN_SUCCESS:
      console.info('Logged in :', action.payload);
        localStorage.token = action.payload.token;
      return Object.assign({}, state, action.payload);
    case LoginActions.FETCH_LOGIN_ERROR:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}

export default user;
