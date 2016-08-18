import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import Base from './components/Base'
import BuildingDetails from './components/BuildingDetails'

class BuildingDetailsContainer extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { base, building, sBuildings, sItems, actions } = this.props;
        if (!base) {
            return (
                <div>
                    Loading base...
                </div>
            )
        }
        return (
            <div>
                <BuildingDetails onUpgradeBuilding={actions.upgradeBuilding.bind(null, base)}
                                 onCreateBuilding={actions.createBuilding.bind(null, base)}
                                 building={building}
                                 sBuildings={sBuildings}
                                 sItems={sItems}/>
            </div>
        );

    }
}

import { getPopulatedCurrentBase } from '../base/reducers/baseReducer'
import { getStaticBuildings, getStaticItems } from '../static/reducers/staticReducer'
import { getSelectedBuilding } from './reducers/buildingReducer'
function mapStateToProps(state) {
    return { base: getPopulatedCurrentBase(state), sBuildings: getStaticBuildings(state), sItems: getStaticItems(state), building: getSelectedBuilding(state)  };
}

import { upgradeBuilding, createBuilding } from '../buildings/actions/buildingActions'

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({ upgradeBuilding, createBuilding }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(BuildingDetailsContainer);

