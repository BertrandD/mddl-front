import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createBase } from './actions/baseActions';
import { fetchBase } from './actions/baseActions';
import { createBuilding } from './actions/buildingActions';
import { fetchBuildings } from '../static/actions/staticActions'
import { Link } from 'react-router';

import Base from './components/Base'

class BaseContainer extends Component {

    constructor(props, context) {
        super(props, context);

        if (!this.props.staticBuildings || this.props.staticBuildings.length === 0) {
            this.props.actions.fetchBuildings();
        }
    }

    render() {
        return (
            <div>
                <Base onCreateBuilding={this.props.actions.createBuilding} staticBuildings={this.props.staticBuildings} base={this.props.base} />
            </div>
        );

    }
}

function mapStateToProps({ base, player, staticBuildings }) {
    return { base, player, staticBuildings };
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({ createBase, fetchBuildings, createBuilding, fetchBase }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseContainer);

