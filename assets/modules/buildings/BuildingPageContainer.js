import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import BuildingDetails from './components/BuildingDetails'
import * as BuildingIds from './BuildingIds'
import ProgressBar from '../core/components/ProgressBar'

import ModuleFactory from './components/buildings/ModuleFactory'
import Silo from './components/buildings/Silo'

class BuildingPageContainer extends Component {

    constructor(props, context) {
        super(props, context);
    }

    getBuildingComponent(building) {

        if (building.endsAt > 0) {
            return (
                <ProgressBar start={building.startedAt} end={building.endsAt} />
            )
        }

        switch (building.buildingId) {
            case BuildingIds.SILO:
                return (
                    <Silo building={building}/>
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

                {building.modules.length > 0 && (
                    <div>
                        <h3>
                            Modules installés : {building.modules.length} / {building.maxModules}
                        </h3>
                        <ul>
                            {building.modules.map(module => (
                                <li>
                                    {module}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
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

