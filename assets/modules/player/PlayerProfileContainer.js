import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PlayerFriends from './components/PlayerFriends'

class PlayerProfileContainer extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { player, players, actions } = this.props;

        return (
            <div className="Block">
                <PlayerFriends player={player} players={players} onAcceptFriend={actions.acceptFriend} onRequestFriend={actions.requestFriend}/>
            </div>
        );
    }
}

import { getcurrentPlayer, getAllPlayers } from 'reducers/playerReducer'
import { acceptFriend, requestFriend } from 'actions/playerActions'

function mapStateToProps(state) {
    return { player: getcurrentPlayer(state), players: getAllPlayers(state)  };
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({ acceptFriend, requestFriend }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerProfileContainer);

