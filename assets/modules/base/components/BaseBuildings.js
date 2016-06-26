import React, { Component, PropTypes } from 'react';
import forEach from 'lodash/forEach'
import map from 'lodash/map'
import { Link } from 'react-router';
import ProgressBar from '../../core/components/ProgressBar'
import BuildingList from '../../buildings/components/BuildingList'
import Duration from '../../core/components/Duration'
import format from '../../../utils/numberFormat'

require('./Base.scss');

class BaseBuilings extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    selectBuilding (building) {
        console.log(building);
        this.setState({
            building
        });
    }

    hasRequirement (building, level, requirement) {
        return building.requirements[level] && building.requirements[level][requirement] && building.requirements[level][requirement].length > 0
    }

    render() {

        const { buildings, sItems, sBuildings } = this.props;
        const { building } = this.state;
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

                {building && (
                    <div className="BuildingDetails">
                        <div className="BuildingName">{building.name}</div>
                        <div className="BuildingDescription">{building.description}</div>

                        <div className="BuildingStats">
                            <p className="margin-bottom-inner">
                                Consomation : <span className="fa fa-bolt color-yellow"> </span> <span className="color-white">{building.useEnergy[building.currentLevel-1] || 0}</span>
                            </p>
                            {building.currentLevel < building.maxLevel && (
                                <div className="BuildingRequirements">
                                    <p className="color-yellow">Prérequis pour le niveau {building.currentLevel + 1}:</p>

                                    {this.hasRequirement(building, building.currentLevel, 'resources') && (
                                        <div>
                                            <p>Ressources:</p>
                                            <ul>
                                                {building.requirements[building.currentLevel].resources.map((req, index) => (
                                                    <li key={index}>
                                                        <span className="color-yellow">{sItems[index].name}:</span> <span className="color-white">{req}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {this.hasRequirement(building, building.currentLevel, 'buildings') && (
                                        <div>
                                            <p>Bâtiment:</p>
                                            <ul>
                                                {building.requirements[building.currentLevel].buildings.map((req, index) => (
                                                    <li key={index}>
                                                        <span className="color-yellow">{sBuildings[req.id].name}:</span> <span className="color-white">{req.level}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {this.hasRequirement(building, building.currentLevel, 'items') && (
                                        <div>
                                            <p>Items:</p>
                                            <ul>
                                                {building.requirements[building.currentLevel].items.map((req, index) => (
                                                    <li key={index}>
                                                        <span className="color-yellow">{sItems[req.id].name}:</span> <span className="color-white">{format(req.count)}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    <div className="margin-bottom-inner">
                                        <span className="color-yellow">Temps de construction : </span>
                                    <span className="color-white">
                                        <Duration milliseconds={building.buildTimeByLevel[building.currentLevel]} />
                                    </span>
                                    </div>

                                    <span className="color-yellow">Consomation au niveau {building.currentLevel + 1} : </span>
                                    <div className="color-white">
                                        <span className="fa fa-bolt color-yellow">&nbsp;</span>{building.useEnergy[building.currentLevel]}
                                    </div>

                                </div>
                            )}
                        </div>
                    </div>
                )}

                <h2>Vos bâtiments</h2>
                <BuildingList sItems={sItems}
                              buildings={buildings}
                              sBuildings={sBuildings}
                              onUpgradeBuilding={this.props.onUpgradeBuilding}
                              onCreateBuilding={this.props.onCreateBuilding}
                              onSelectBuilding={this.selectBuilding.bind(this)}/>

                <h2>Bâtiments constructibles</h2>
                <BuildingList sItems={sItems}
                              buildings={buildingsAvailable}
                              sBuildings={sBuildings}
                              onUpgradeBuilding={this.props.onUpgradeBuilding}
                              onCreateBuilding={this.props.onCreateBuilding}
                              onSelectBuilding={this.selectBuilding.bind(this)}/>

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
