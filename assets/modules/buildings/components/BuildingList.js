import React, { Component, PropTypes } from 'react';
import ProgressBar from '../../core/components/ProgressBar'
import Building from './Building'
import './BuildingList.scss';

class BuildingList extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {

        const { buildings, sItems, sBuildings } = this.props;

        return (
            <div className="BuildingList">
                {buildings.map((building, index) => (
                    <Building key={index} building={building} sItems={sItems} sBuildings={sBuildings} onUpgradeBuilding={this.props.onUpgradeBuilding.bind(null, building)} onCreateBuilding={this.props.onCreateBuilding.bind(null, building)}/>
                ))}
            </div>
        )
    }
}

BuildingList.propTypes = {
    sItems: PropTypes.object.isRequired,
    sBuildings: PropTypes.object.isRequired,
    buildings: PropTypes.array.isRequired,
    onUpgradeBuilding: PropTypes.func.isRequired,
    onCreateBuilding: PropTypes.func.isRequired
};

export default BuildingList;