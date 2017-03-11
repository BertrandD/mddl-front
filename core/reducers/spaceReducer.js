import * as BaseActions from '../actionTypes/BaseActionTypes';
import * as SpaceActions from '../actionTypes/SpaceActionTypes';
import { getcurrentPlayer } from './playerReducer'

export function getAstralObject (state, id) {
    return state.entities.space[id];
}

export function getPopulatedAstralObject (state, id) {
    const astralObject = state.entities.space[id];
    const satellites = [];
    astralObject.satellites.forEach((sat) => {
        satellites.push(getPopulatedAstralObject(state, sat));
    });
    const player = getcurrentPlayer(state);
    if (player.planetScans[id]) {
        const bases = player.planetScans[id].baseScanned;
        const lastScan = player.planetScans[id].date;
        return {...astralObject, bases, lastScan, satellites}
    }
    return {...astralObject, satellites}
}

export function space (state = {}, action) {
  switch (action.type) {
      case BaseActions.FETCH_BASE_SUCCESS:
      case SpaceActions.FETCH_SYSTEM_SUCCESS:
          return {
            ...state,
            ...action.payload.astralObject
          };
    default:
      return state;
  }
}

export default space;
