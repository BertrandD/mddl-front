import * as Action from '../actionTypes/PrivateMessageActionTypes';
import filter from 'lodash/filter'

export function getReceivedPrivateMessages(state) {
    return filter(state.privateMessages, pm => pm.author.id != state.currentPlayer.id);
}

export function getSentPrivateMessages(state) {
    return filter(state.privateMessages, pm => pm.author.id == state.currentPlayer.id);
}

export function privateMessages(state = {}, action) {
    switch(action.type) {
        case Action.FETCH_MESSAGE_SUCCESS:
            return Object.assign({}, state, action.payload.pms);
        default:
            return state;
    }
}