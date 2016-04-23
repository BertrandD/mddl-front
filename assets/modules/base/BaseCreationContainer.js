import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createBase } from './actions/baseActions';
import { Link } from 'react-router';

import BaseCreation from './components/BaseCreation'

class BaseCreationContainer extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const currentBase = this.props.entities.bases[this.props.currentBase.id];
        const currentPlayer = this.props.entities.players[this.props.currentPlayer.id];
        if (currentBase) {
            return (
                <div>
                    Congratulations ! You just created the base <strong>{ currentBase.name }</strong> !
                    <Link to="/"> Go to home </Link>
                </div>
            )
        }
        return (
            <div>
                Create a base ?
                <BaseCreation player={currentPlayer} onSubmit={this.props.actions.createBase} />
            </div>
        );

    }
}

function mapStateToProps({ currentBase, currentPlayer, entities }) {
    return { currentBase, currentPlayer, entities };
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({ createBase }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseCreationContainer);

