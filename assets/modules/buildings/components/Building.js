import React, { Component, PropTypes } from 'react';
import ProgressBar from '../../core/components/ProgressBar'
import Duration from '../../core/components/Duration'
import keys from 'lodash/keys'
import map from 'lodash/map'
import './Building.scss';

class Building extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            start: Date.now(),
            end: Date.now() + 90000
        }
    }

    upgradeBuilding () {
        if (!this.props.building.currentLevel) {
            this.props.onCreateBuilding();
        } else {
            this.props.onUpgradeBuilding();
        }
    }

    hasRequirement (building, level, requirement) {
        return building.requirements[level] && building.requirements[level][requirement] && building.requirements[level][requirement].length > 0
    }

    render() {

        const { building, sItems, sBuildings } = this.props;

        if (!building.currentLevel) {
            building.currentLevel = 0;
        }

        return (
            <div className="Building">
                <div className="BuildingHeader">
                    {building.name}
                </div>
                <div className="BuildingBody">
                    <div className="BuildingImage">
                        <img src="/img/buildings/batiment_01.png" alt=""/>
                    </div>
                    <div className="BuildingStats">
                        <p className="margin-bottom-inner">
                            Consomation : <span className="fa fa-bolt color-yellow"> </span> <span className="color-white">{building.reqEnergy[building.currentLevel-1] || 0}</span>
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
                                                    <span className="color-yellow">{sItems[req.id].name}:</span> <span className="color-white">{req.count}</span>
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
                                    <span className="fa fa-bolt color-yellow">&nbsp;</span>{building.reqEnergy[building.currentLevel]}
                                </div>

                            </div>
                        )}
                    </div>
                </div>
                <div className="BuildingFooter">
                    <div className="BuildingLevel">
                        {building.endsAt > 0 && (
                            <div>
                                <div className="margin-bottom-inner">Niveau {building.currentLevel} <span className="fa fa-arrow-right">&nbsp;</span> {building.currentLevel + 1}</div>
                                <ProgressBar start={building.startedAt} end={building.endsAt} />
                            </div>
                        ) || (
                            <div>
                                Niveau {building.currentLevel}
                            </div>
                        )}
                    </div>
                    {building.currentLevel === 0 && (
                        <div className="BuildingAction">
                            <div className="IconBuild" onClick={this.upgradeBuilding.bind(this)}></div>
                        </div>
                    ) || building.endsAt <= 0 && (
                        <div className="BuildingAction">
                            {building.currentLevel < building.maxLevel && (
                                <div className="IconUpgrade" onClick={this.upgradeBuilding.bind(this)}></div>
                            ) || (
                                <div>
                                    Max level reached !
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

Building.propTypes = {
    sItems: PropTypes.object.isRequired,
    sBuildings: PropTypes.object.isRequired,
    building: PropTypes.object.isRequired,
    onUpgradeBuilding: PropTypes.func.isRequired,
    onCreateBuilding: PropTypes.func.isRequired
};

export default Building;