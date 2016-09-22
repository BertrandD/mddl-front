import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import BuildingDetails from './components/BuildingDetails'

class ObjectDetailsContainer extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { base, object, sBuildings, sItems, actions, strings } = this.props;

        if (!object) {
            return (
                <div className="Block">
                    { strings.buildings.view_details }
                </div>
            )
        }
        return (
            <div className="Block">
                <BuildingDetails onUpgradeBuilding={actions.upgradeBuilding.bind(null, base)}
                                 onCreateBuilding={actions.createBuilding.bind(null, base)}
                                 strings={strings}
                                 building={object}
                                 sBuildings={sBuildings}
                                 sItems={sItems}/>
            </div>
        );

    }
}

import { getPopulatedCurrentBase } from 'reducers/baseReducer'
import { getStaticBuildings, getStaticItems } from 'reducers/staticReducer'
import { getSelectedObject } from 'reducers/buildingReducer'
import { getStrings } from 'reducers/userReducer'


function mapStateToProps(state) {
    return { base: getPopulatedCurrentBase(state), sBuildings: getStaticBuildings(state), sItems: getStaticItems(state), object: getSelectedObject(state), strings: getStrings(state)  };
}

import { upgradeBuilding, createBuilding } from '../../../core/actions/buildingActions'

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({ upgradeBuilding, createBuilding }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(ObjectDetailsContainer);

