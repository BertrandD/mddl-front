import { FETCH_LOGIN_SUCCESS, FETCH_LOGIN_ERROR } from '../actions/LoginActionTypes';

function user (state = {}, action) {
  switch (action.type) {
    case FETCH_LOGIN_SUCCESS:
      console.info('Logged in :', action.payload);
        localStorage.token = action.payload.token;
      return Object.assign({}, state, action.payload);
    case FETCH_LOGIN_ERROR:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}

export default user;
