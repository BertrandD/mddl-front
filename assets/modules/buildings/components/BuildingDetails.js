import React, { Component, PropTypes } from 'react';
import forEach from 'lodash/forEach'
import map from 'lodash/map'
import { Link } from 'react-router';
import ProgressBar from '../../core/components/ProgressBar'
import BuildingList from '../../buildings/components/BuildingList'
import Duration from '../../core/components/Duration'
import format from '../../../utils/numberFormat'

class BuildingDetails extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    hasRequirement (building, level, requirement) {
        return building.requirements[level] && building.requirements[level][requirement] && building.requirements[level][requirement].length > 0
    }

    render() {

        const { building, sItems, sBuildings } = this.props;

        return (
            <div className="BaseBuildings">
                {building && (
                    <div className="BuildingDetails">
                        <div className="BuildingName">{building.name} {building.currentLevel && (<span> - Lvl {building.currentLevel}</span>)}</div>
                        <div className="BuildingDescription">{building.description}</div>

                        <div className="BuildingStats">
                            <p className="margin-bottom-inner">
                                Consomation : <span className="fa fa-bolt color-yellow"> </span> <span className="color-white">{building.useEnergy[building.currentLevel-1] || 0}</span>
                            </p>
                                <div className="BuildingRequirements">
                                    {building.requirements[building.currentLevel+1 || 1] && (
                                        <div>
                                            <p className="color-yellow">Prérequis pour le niveau {building.currentLevel + 1 || 1}:</p>

                                            {this.hasRequirement(building, building.currentLevel + 1 || 1, 'buildings') && (
                                                <div>
                                                    <p>Bâtiment:</p>
                                                    <ul>
                                                        {building.requirements[building.currentLevel + 1 || 1].buildings.map((req) => (
                                                            <li key={req.id}>
                                                                <span className="color-yellow">{sBuildings[req.id].name}:</span> <span className="color-white">{req.level}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {this.hasRequirement(building, building.currentLevel + 1 || 1, 'items') && (
                                                <div>
                                                    <p>Items:</p>
                                                    <ul>
                                                        {building.requirements[building.currentLevel + 1 || 1].items.map((req) => (
                                                            <li key={req.id}>
                                                                <span className="color-yellow">{sItems[req.id].name}:</span> <span className="color-white">{format(req.count)}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                        )}

                                    <div className="margin-bottom-inner">
                                        <span className="color-yellow">Temps de construction : </span>
                                    <span className="color-white">
                                        <Duration milliseconds={building.buildTimes[building.currentLevel || 0]} />
                                    </span>
                                    </div>

                                    <span className="color-yellow">Consomation au niveau {building.currentLevel + 1 || 1} : </span>
                                    <span className="color-white">
                                        <span className="fa fa-bolt color-yellow">&nbsp;</span>{building.useEnergy[building.currentLevel || 0]}
                                    </span>
                                </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

BuildingDetails.propTypes = {
    sItems: PropTypes.object.isRequired,
    sBuildings: PropTypes.object.isRequired,
    onUpgradeBuilding: PropTypes.func.isRequired,
    onCreateBuilding: PropTypes.func.isRequired
};

export default BuildingDetails;
