import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import BuildingDetails from './components/BuildingDetails'

class BuildingDetailsContainer extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { base, building, sBuildings, sItems, actions } = this.props;
        if (!building) {
            return (
                <div className="Block">
                    Sélectionnez un bâtiment pour voir les informations détaillées
                </div>
            )
        }
        return (
            <div className="Block">
                <BuildingDetails onUpgradeBuilding={actions.upgradeBuilding.bind(null, base)}
                                 onCreateBuilding={actions.createBuilding.bind(null, base)}
                                 building={building}
                                 sBuildings={sBuildings}
                                 sItems={sItems}/>
            </div>
        );

    }
}

import { getPopulatedCurrentBase } from '../../../core/reducers/baseReducer'
import { getStaticBuildings, getStaticItems } from '../../../core/reducers/staticReducer'
import { getSelectedBuilding } from './../../../core/reducers/buildingReducer'
function mapStateToProps(state) {
    return { base: getPopulatedCurrentBase(state), sBuildings: getStaticBuildings(state), sItems: getStaticItems(state), building: getSelectedBuilding(state)  };
}

import { upgradeBuilding, createBuilding } from '../../../core/actions/buildingActions'

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({ upgradeBuilding, createBuilding }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(BuildingDetailsContainer);

