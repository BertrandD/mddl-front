import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createBase } from './actions/baseActions';
import { fetchBase } from './actions/baseActions';
import { createBuilding, upgradeBuilding } from './actions/buildingActions';
import { fetchBuildings } from '../static/actions/staticActions'
import { Link } from 'react-router';

import Base from './components/Base'

class BaseContainer extends Component {

    constructor(props, context) {
        super(props, context);

        if (!this.props.entities.staticBuildings || Object.keys(this.props.entities.staticBuildings).length === 0) {
            this.props.actions.fetchBuildings();
        }
    }

    render() {
        const currentBase = this.props.entities.bases[this.props.currentBase.id];
        if (!currentBase) {
            return (
                <div>
                    Loading base...
                </div>
            )
        }
        return (
            <div>
                <Base onCreateBuilding={this.props.actions.createBuilding.bind(this, currentBase)}
                      onUpgradeBuilding={this.props.actions.upgradeBuilding.bind(this, currentBase)}
                      staticBuildings={this.props.entities.staticBuildings} base={currentBase} />
            </div>
        );

    }
}

function mapStateToProps({ currentBase, currentPlayer, entities }) {
    return { currentBase, currentPlayer, entities };
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({ createBase, fetchBuildings, createBuilding, upgradeBuilding, fetchBase }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseContainer);

