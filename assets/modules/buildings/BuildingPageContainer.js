import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import BuildingDetails from './components/BuildingDetails'
import * as BuildingIds from './BuildingIds'

import ModuleFactory from './components/buildings/ModuleFactory'
import Storage from './components/buildings/Storage'

class BuildingPageContainer extends Component {

    constructor(props, context) {
        super(props, context);
    }

    getBuildingComponent(building) {
        switch (building.buildingId) {
            case BuildingIds.STORAGE:
                return (
                    <Storage building={building}/>
                );
            case BuildingIds.MODULE_FACTORY:
                return (
                    <ModuleFactory building={building} sItems={this.props.sItems}/>
                );
            default :
                return (
                    <span>WIP</span>
                );
        }
    }

    render() {
        const { base, building, sBuildings, sItems, actions } = this.props;
        if (!building) {
            return (
                <div className="Block">
                    <p>
                        Ce bâtiment n'existe pas !
                    </p>

                    <Link to="/base">
                        <button className="button--primary">Retour à la base</button>
                    </Link>
                </div>
            )
        }

        return (
            <div className="Block">
                <h1>
                    <span className="color-yellow">{building.name}</span> <span className="font-size-small">
                        <Link to="/base">
                            Retour à la base
                        </Link>
                    </span>
                </h1>
                {building.description}

                {this.getBuildingComponent(building)}
            </div>
        );

    }
}

import { getPopulatedCurrentBase } from 'reducers/baseReducer'
import { getStaticBuildings, getStaticItems } from 'reducers/staticReducer'
import { getBuilding } from 'reducers/buildingReducer'

function mapStateToProps(state, ownProps) {
    return { base: getPopulatedCurrentBase(state), sBuildings: getStaticBuildings(state), sItems: getStaticItems(state), building: getBuilding(state, ownProps.params.buildingId)  };
}

import { upgradeBuilding, createBuilding } from 'actions/buildingActions'

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({ upgradeBuilding, createBuilding }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(BuildingPageContainer);

