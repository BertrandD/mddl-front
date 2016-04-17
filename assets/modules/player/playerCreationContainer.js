import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createPlayer } from './actions/playerActions';
import { Link } from 'react-router';

import PlayerCreation from './components/PlayerCreation'

class PlayerCreationContainer extends Component {

    constructor(props, context) {
        super(props, context);
        this.props.player.createSuccess = false;
    }

    render() {
        if (this.props.player.createSuccess ) {
            return (
                <div>
                    Congratulations ! You just created the player <strong>{ this.props.player.name }</strong> !
                    <Link to="/"> Go to home </Link>
                </div>
            )
        }
        return (
            <div>
                Create a player ?
                <PlayerCreation player={this.props.player} onSubmit={this.props.actions.createPlayer} />
            </div>
        );

    }
}

function mapStateToProps({ player }) {
    return { player };
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({ createPlayer }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerCreationContainer);

