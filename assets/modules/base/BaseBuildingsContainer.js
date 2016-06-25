import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import Base from './components/Base'
import BaseBuildings from './components/BaseBuildings'

class BaseContainer extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { base, sBuildings, sItems, actions } = this.props;
        if (!base) {
            return (
                <div>
                    Loading base...
                </div>
            )
        }
        return (
            <div>
                <BaseBuildings buildings={base.buildings}
                               onUpgradeBuilding={this.props.actions.upgradeBuilding}
                               onCreateBuilding={this.props.actions.createBuilding}
                               sBuildings={sBuildings}
                               sItems={sItems}/>
            </div>
        );

    }
}

import { getPopulatedCurrentBase } from './reducers/baseReducer'
import { getStaticBuildings, getStaticItems } from '../static/reducers/staticReducer'

function mapStateToProps(state) {
    return { base: getPopulatedCurrentBase(state), sBuildings: getStaticBuildings(state), sItems: getStaticItems(state)  };
}

import { upgradeBuilding, createBuilding } from '../buildings/actions/buildingActions'

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({ upgradeBuilding, createBuilding }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseContainer);

