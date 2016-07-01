import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

import PlayerFriends from './components/PlayerFriends'

class PlayerProfileContainer extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { player, players } = this.props;

        return (
            <div className="Block">
                <PlayerFriends player={player} players={players}/>
            </div>
        );

    }
}

import { getcurrentPlayer, getAllPlayers } from './reducers/playerReducer'

function mapStateToProps(state) {
    return { player: getcurrentPlayer(state), players: getAllPlayers(state)  };
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({  }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerProfileContainer);

