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
        const { base, sBuildings, actions, strings } = this.props;
        if (!base) {
            return (
                <div>
                    { strings.app.loading }...
                </div>
            )
        }
        return (
            <div>
                <BaseBuildings buildings={base.buildings}
                               onUpgradeBuilding={actions.upgradeBuilding.bind(null, base)}
                               onCreateBuilding={actions.createBuilding.bind(null, base)}
                               onSelectBuilding={actions.viewBuildingDetails.bind(null)}
                               onSelectModule={actions.viewModuleDetails.bind(null)}
                               onAttachModule={actions.attachModule.bind(null)}
                               sBuildings={sBuildings}
                               strings={strings}/>
            </div>
        );

    }
}

import { getPopulatedCurrentBase } from 'reducers/baseReducer'
import { getStaticBuildings } from 'reducers/staticReducer'
import { getStrings } from 'reducers/userReducer'

function mapStateToProps(state) {
    return { base: getPopulatedCurrentBase(state), sBuildings: getStaticBuildings(state), strings: getStrings(state)  };
}

import { upgradeBuilding, createBuilding, viewBuildingDetails, viewModuleDetails, attachModule } from 'actions/buildingActions'

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({ upgradeBuilding, createBuilding, viewBuildingDetails, viewModuleDetails, attachModule }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseBuildingsContainer);

