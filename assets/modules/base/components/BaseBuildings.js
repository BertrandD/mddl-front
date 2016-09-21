import React, { Component, PropTypes } from 'react';
import forEach from 'lodash/forEach'
import map from 'lodash/map'
import { Link } from 'react-router';
import ProgressBar from '../../core/components/ProgressBar'
import BuildingList from '../../buildings/components/BuildingList'
import Duration from '../../core/components/Duration'
import format from 'utils/numberFormat'

require('./Base.scss');

class BaseBuilings extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    render() {

        const { buildings, sBuildings, strings } = this.props;
        const buildingsAvailable = [];

        forEach(sBuildings, (sBuilding) => {
            //if (!buildings.some(b => b.buildingId === sBuilding.id)) {
                buildingsAvailable.push(sBuilding);
            //}
        });

        return (
            <div className="BaseBuildings">

                <h2>{ strings.buildings.your }</h2>
                <BuildingList strings={strings}
                              buildings={buildings}
                              onUpgradeBuilding={this.props.onUpgradeBuilding}
                              onCreateBuilding={this.props.onCreateBuilding}
                              onSelectBuilding={this.props.onSelectBuilding.bind(null)}
                              onSelectModule={this.props.onSelectModule.bind(null)}/>

                <h2>{ strings.buildings.available }</h2>
                <BuildingList strings={strings}
                              buildings={buildingsAvailable}
                              onUpgradeBuilding={this.props.onUpgradeBuilding}
                              onCreateBuilding={this.props.onCreateBuilding}
                              onSelectBuilding={this.props.onSelectBuilding.bind(null)}
                              onSelectModule={this.props.onSelectModule.bind(null)}/>

            </div>
        )
    }
}

BaseBuilings.propTypes = {
    buildings: PropTypes.array.isRequired,
    sBuildings: PropTypes.object.isRequired,
    onUpgradeBuilding: PropTypes.func.isRequired,
    onCreateBuilding: PropTypes.func.isRequired,
    onSelectBuilding: PropTypes.func.isRequired,
    onSelectModule: PropTypes.func.isRequired,
    strings: PropTypes.object.isRequired
};

export default BaseBuilings;
