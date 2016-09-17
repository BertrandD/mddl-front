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

        const { buildings, sItems, sBuildings, strings } = this.props;
        const buildingsAvailable = [];

        forEach(this.props.sBuildings, (sBuilding) => {
            //if (!buildings.some(b => b.buildingId === sBuilding.id)) {
                buildingsAvailable.push(sBuilding);
            //}
        });

        return (
            <div className="BaseBuildings">

                <h2>{ strings.buildings.your }</h2>
                <BuildingList sItems={sItems}
                              buildings={buildings}
                              sBuildings={sBuildings}
                              onUpgradeBuilding={this.props.onUpgradeBuilding}
                              onCreateBuilding={this.props.onCreateBuilding}
                              onSelectBuilding={this.props.onSelectBuilding.bind(this)}/>

                <h2>{ strings.buildings.available }</h2>
                <BuildingList sItems={sItems}
                              buildings={buildingsAvailable}
                              sBuildings={sBuildings}
                              onUpgradeBuilding={this.props.onUpgradeBuilding}
                              onCreateBuilding={this.props.onCreateBuilding}
                              onSelectBuilding={this.props.onSelectBuilding.bind(this)}/>

            </div>
        )
    }
}

BaseBuilings.propTypes = {
    buildings: PropTypes.array.isRequired,
    sItems: PropTypes.object.isRequired,
    sBuildings: PropTypes.object.isRequired,
    onUpgradeBuilding: PropTypes.func.isRequired,
    onCreateBuilding: PropTypes.func.isRequired,
    onSelectBuilding: PropTypes.func.isRequired,
    strings: PropTypes.object.isRequired
};

export default BaseBuilings;
