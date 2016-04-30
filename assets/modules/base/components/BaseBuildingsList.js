import React, { Component, PropTypes } from 'react';
import map from 'lodash/map'
import forEach from 'lodash/forEach'
import * as BuildingTypes from '../../buildings/BuildingTypes'
import './BaseBuildingsList.scss'

class BaseBuildingsList extends Component {

    render() {

        const orderedBuildings = {};
        const orderTypes = {
            [BuildingTypes.HEADQUARTER]: 'Headquarter',
            [BuildingTypes.STORAGE]: 'Storage'
        };

        forEach(this.props.staticBuildings, (sBuilding) => {
            if (!orderedBuildings[sBuilding.type]) {
                orderedBuildings[sBuilding.type] = [];
            }
            orderedBuildings[sBuilding.type].push(sBuilding);
        });

        const baseBuildings = [];

        this.props.baseBuildings.forEach((bBuilding) => {
            baseBuildings[this.props.buildings[bBuilding].buildingId] = this.props.buildings[bBuilding];
        });

        return (
            <div className="BaseBuildingsList">
                {map(orderTypes,((type, key) => {

                    return (
                        <div key={key}>
                            {orderedBuildings[key].map((sBuilding, index) => {
                                return (
                                    <div key={index} className="BaseBuildingsListItem">
                                        <span onClick={this.props.onSelectBuilding.bind(null, sBuilding)}>
                                            {sBuilding.name} {baseBuildings[sBuilding.id] && (
                                            <span>
                                                - Level {baseBuildings[sBuilding.id].currentLevel}
                                                { baseBuildings[sBuilding.id].endsAt > 0 && (
                                                    <span>
                                                    <i className="fa fa-arrow-right"> </i> {baseBuildings[sBuilding.id].currentLevel + 1}
                                                    </span>
                                                )}
                                            </span>
                                        )}
                                        </span>
                                    </div>
                                );
                            })}
                            <hr/>
                        </div>
                    );

                }))}
            </div>
        )
    }
}

BaseBuildingsList.propTypes = {
    baseBuildings: PropTypes.array.isRequired,
    staticBuildings: PropTypes.object.isRequired,
    buildings: PropTypes.object.isRequired,
    onSelectBuilding: PropTypes.func.isRequired
};

export default BaseBuildingsList;
