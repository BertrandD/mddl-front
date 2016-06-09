import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createPlayer } from './actions/playerActions';
import { Link } from 'react-router';

import PlayerCreation from './components/PlayerCreation'

class PlayerCreationContainer extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { currentPlayer } = this.props;
        if (currentPlayer) {
            return (
                <div>
                    Congratulations ! You just created the player <strong>{ currentPlayer.name }</strong> !
                    <Link to="/create/base"> Create my first base </Link>
                </div>
            )
        }
        return (
            <div>
                Create a player ?
                <PlayerCreation onSubmit={this.props.actions.createPlayer} />
            </div>
        );

    }
}

import { getcurrentPlayer } from './reducers/playerReducer'

function mapStateToProps(state) {
    return { player: getcurrentPlayer(state)  };
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({ createPlayer }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerCreationContainer);

