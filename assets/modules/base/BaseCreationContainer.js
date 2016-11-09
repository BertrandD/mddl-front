import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createBase } from 'actions/baseActions';
import { Link } from 'react-router';

import BaseCreation from './components/BaseCreation'

class BaseCreationContainer extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { currentBase, currentPlayer } = this.props;
        if (currentBase) {
            return (
                <div className="Block">
                    Congratulations ! You just created the base <strong>{ currentBase.name }</strong> !
                    <Link to="/"> Go to home </Link>
                </div>
            )
        }
        return (
            <div className="Block">
                Create a base ?
                <BaseCreation player={currentPlayer} onSubmit={this.props.actions.createBase} />
            </div>
        );

    }
}

import { getCurrentBase } from 'reducers/baseReducer'
import { getcurrentPlayer } from 'reducers/playerReducer'

function mapStateToProps(state) {
    return { currentBase: getCurrentBase(state), currentPlayer: getcurrentPlayer(state) };
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({ createBase }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseCreationContainer);

