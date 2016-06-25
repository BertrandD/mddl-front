import React, { Component, PropTypes } from 'react';
import forEach from 'lodash/forEach'
import map from 'lodash/map'
import { Link } from 'react-router';
import ProgressBar from '../../core/components/ProgressBar'
import BuildingList from '../../buildings/components/BuildingList'

require('./Base.scss');

class BaseBuilings extends Component {

    constructor(props, context) {
        super(props, context);
        this.state= {
            now: Date.now(),
            end: Date.now() + 2000
        }
    }

    render() {

        const { buildings, sItems, sBuildings } = this.props;

        const buildingsAvailable = [];

        forEach(this.props.sBuildings, (sBuilding) => {
            if (!buildings.some(b => b.buildingId === sBuilding.id)) {
                buildingsAvailable.push(sBuilding);
            }
        });

        return (
            <div className="BaseBuildings">
                <Link to="/base">
                    Retour à la base
                </Link>

                <h2>Vos bâtiments</h2>
                <BuildingList sItems={sItems} buildings={buildings} sBuildings={sBuildings} onUpgradeBuilding={this.props.onUpgradeBuilding} onCreateBuilding={this.props.onCreateBuilding}/>

                <h2>Bâtiments constructibles</h2>
                <BuildingList sItems={sItems} buildings={buildingsAvailable} sBuildings={sBuildings} onUpgradeBuilding={this.props.onUpgradeBuilding} onCreateBuilding={this.props.onCreateBuilding}/>
            </div>
        )
    }
}

BaseBuilings.propTypes = {
    buildings: PropTypes.array.isRequired,
    sItems: PropTypes.object.isRequired,
    sBuildings: PropTypes.object.isRequired,
    onUpgradeBuilding: PropTypes.func.isRequired,
    onCreateBuilding: PropTypes.func.isRequired
};

export default BaseBuilings;
