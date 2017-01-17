import * as LoginActions from '../actionTypes/LoginActionTypes';
import * as AppActions from '../actionTypes/AppActionTypes';
import * as PlayerActions from '../actionTypes/PlayerActionTypes';
import FR from 'translations/fr'
import EN from 'translations/en'


const trans = {
  FR,
  EN
};

export function getUser (state) {
  return state.user;
}

export function getStrings (state) {
  return trans[state.user.lang];
}

function user (state = {lang: 'en'}, action) {
  switch (action.type) {
    case LoginActions.LOGOUT:
        localStorage.token = '';
      return {};
    case AppActions.CHANGE_LANGUAGE:
          return {
            ...state,
            lang: action.payload.lang
          };
    case PlayerActions.SELECT_PLAYER:
          return {
            ...state,
            lang: action.payload.lang
          };
    case LoginActions.FETCH_LOGIN_SUCCESS:
      console.info('Logged in :', action.payload);
        localStorage.setItem("token", action.payload.token);
      return Object.assign({}, state, action.payload);
    case LoginActions.FETCH_LOGIN_ERROR:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}

export default user;
