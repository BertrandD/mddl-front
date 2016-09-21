import React, { Component, PropTypes } from 'react';
import ProgressBar from '../../core/components/ProgressBar'
import Building from './Building'
import './BuildingList.scss';

class BuildingList extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {

        const { buildings, strings } = this.props;

        return (
            <div className="BuildingList">
                {buildings.map((building, index) => (
                    <Building key={index}
                              building={building}
                              strings={strings}
                              onUpgradeBuilding={this.props.onUpgradeBuilding.bind(null, building)}
                              onCreateBuilding={this.props.onCreateBuilding.bind(null, building)}
                              onSelectBuilding={this.props.onSelectBuilding.bind(null, building)}
                              onSelectModule={this.props.onSelectModule.bind(null, building)}/>
                ))}
            </div>
        )
    }
}

BuildingList.propTypes = {
    strings: PropTypes.object.isRequired,
    buildings: PropTypes.array.isRequired,
    onUpgradeBuilding: PropTypes.func.isRequired,
    onCreateBuilding: PropTypes.func.isRequired,
    onSelectBuilding: PropTypes.func.isRequired,
    onSelectModule: PropTypes.func.isRequired
};

export default BuildingList;