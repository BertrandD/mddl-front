import * as SpyActions from '../actionTypes/SpyActionTypes';

export function getReports (state) {
  return state.entities.reports;
}

export function reports (state = {}, action) {
  switch (action.type) {
      case SpyActions.FETCH_REPORT_SUCCESS:
      case SpyActions.SPY_BASE_SUCCESS:
          return {
            ...state,
            ...action.payload.report
          };
    default:
      return state;
  }
}

export default reports;
