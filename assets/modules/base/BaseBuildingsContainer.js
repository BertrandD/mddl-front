import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import Base from './components/Base'
import BaseBuildings from './components/BaseBuildings'

class BaseBuildingsContainer extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { base, sBuildings, sItems, actions, strings } = this.props;
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
                               onUpgradeBuilding={actions.upgradeBuilding.bind(null, base)}
                               onCreateBuilding={actions.createBuilding.bind(null, base)}
                               onSelectBuilding={actions.selectBuilding.bind(null)}
                               sBuildings={sBuildings}
                               strings={strings}
                               sItems={sItems}/>
            </div>
        );

    }
}

import { getPopulatedCurrentBase } from 'reducers/baseReducer'
import { getStaticBuildings, getStaticItems } from 'reducers/staticReducer'
import { getStrings } from 'reducers/userReducer'

function mapStateToProps(state) {
    return { base: getPopulatedCurrentBase(state), sBuildings: getStaticBuildings(state), sItems: getStaticItems(state), strings: getStrings(state)  };
}

import { upgradeBuilding, createBuilding, selectBuilding } from 'actions/buildingActions'

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({ upgradeBuilding, createBuilding, selectBuilding }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseBuildingsContainer);

