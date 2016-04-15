import { FETCH_LOGIN_SUCCESS } from '../constants/ActionTypes';

function user (state = {}, action) {
  switch (action.type) {
    case FETCH_LOGIN_SUCCESS:
      console.info('Logged in :', action.payload);
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}

export default user;
