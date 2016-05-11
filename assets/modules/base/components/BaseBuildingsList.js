import React, { Component, PropTypes } from 'react';
import map from 'lodash/map'
import forEach from 'lodash/forEach'
import * as BuildingTypes from '../../buildings/BuildingTypes'
import './BaseBuildingsList.scss'

class BaseBuildingsList extends Component {

    handleSelectBuilding(sBuilding, building) {
        if (building) {
            this.props.onSelectBuilding(building)
        } else {
            this.props.onSelectStaticBuilding(sBuilding)
        }
    }

    render() {

        const orderedBuildings = {};
        const orderTypes = {
            [BuildingTypes.HEADQUARTER]: 'Headquarter',
            [BuildingTypes.STORAGE]: 'Storages',
            [BuildingTypes.MINE]: 'Mines'
        };

        forEach(this.props.staticBuildings, (sBuilding) => {
            if (!orderedBuildings[sBuilding.type]) {
                orderedBuildings[sBuilding.type] = [];
            }
            orderedBuildings[sBuilding.type].push(sBuilding);
        });

        const baseBuildings = [];

        this.props.base.buildings.forEach((building) => {
            baseBuildings[building.buildingId] = building;
        });

        return (
            <div className="BaseBuildingsList">
                {map(orderTypes,((type, key) => {
                    return (
                        <div key={key}>

                            <h3 className="BaseBuildingsListTitle">{orderTypes[key]}</h3>

                            {orderedBuildings[key] && orderedBuildings[key].map((sBuilding, index) => {
                                return (
                                    <div key={index} className="BaseBuildingsListItem">
                                        <span onClick={this.handleSelectBuilding.bind(this, sBuilding, baseBuildings[sBuilding.id])}>
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
    staticBuildings: PropTypes.object.isRequired,
    base: PropTypes.object.isRequired,
    onSelectBuilding: PropTypes.func.isRequired,
    onSelectStaticBuilding: PropTypes.func.isRequired
};

export default BaseBuildingsList;
