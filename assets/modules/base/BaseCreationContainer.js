import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createBase } from './actions/baseActions';
import { Link } from 'react-router';

import BaseCreation from './components/BaseCreation'

class BaseCreationContainer extends Component {

    constructor(props, context) {
        super(props, context);
        this.props.base.createSuccess = false;
    }

    render() {
        if (this.props.base.createSuccess ) {
            return (
                <div>
                    Congratulations ! You just created the base <strong>{ this.props.base.name }</strong> !
                    <Link to="/"> Go to home </Link>
                </div>
            )
        }
        return (
            <div>
                Create a base ?
                <BaseCreation base={this.props.base} player={this.props.player} onSubmit={this.props.actions.createBase} />
            </div>
        );

    }
}

function mapStateToProps({ base, player }) {
    return { base, player };
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({ createBase }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseCreationContainer);

