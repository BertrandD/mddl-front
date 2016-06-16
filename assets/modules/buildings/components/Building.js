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

    render() {

        const { building, sItems } = this.props;

        if (!building.currentLevel) {
            building.currentLevel = 0;
        }

        return (
            <div className="Building">
                <div className="BuildingHeader">
                    {building.name}
                </div>
                <div className="BuildingBody">
                    <div className="BuildingDescription">
                        <p>
                            {building.description}
                        </p>

                    </div>
                    <div className="BuildingImage">
                        <img src="/img/buildings/batiment_01.png" alt=""/>
                    </div>
                    <div className="BuildingStats">
                        <p className="color-yellow">Niveau {building.currentLevel + 1}:</p>

                        {building.requirements[building.currentLevel + 1] && keys(building.requirements[building.currentLevel + 1].resources).length > 0 && (
                            <div>
                                <p>Prérequis:</p>
                                <ul>
                                    {map(building.requirements[building.currentLevel + 1].resources, (req, index) => (
                                        <li key={index}>
                                            <span className="color-yellow">{sItems[index].name}:</span> <span className="color-white">{req}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {building.requirements[building.currentLevel + 1] && keys(building.requirements[building.currentLevel + 1].items).length > 0 && (
                            <div>
                                <p>Prérequis:</p>
                                <ul>
                                    {map(building.requirements[building.currentLevel + 1].items, (req, index) => (
                                        <li key={index}>
                                            <span className="color-yellow">{sItems[req.id].name}:</span> <span className="color-white">{req.count}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <p>
                            Consomation:
                        </p>
                        <ul>
                            <li>
                                <span className="fa fa-bolt color-yellow"> </span> <span className="color-white">{building.requiredEnergy[building.currentLevel + 1]}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={"BuildingFooter " + (building.endsAt > 0 ? '' : 'BuildingFooterHoverable')} onClick={this.upgradeBuilding.bind(this)}>
                    <div className="BuildingFooterLeft">
                        <div className="BuildingUpgrade">
                            <span className="color-white">Temps de construction :</span>
                            <Duration milliseconds={building.buildTime} />
                        </div>
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
                    </div>
                    {building.currentLevel === 0 && (
                        <div className="BuildingAction">
                            <div className="IconBuild"></div>
                        </div>
                    ) || building.endsAt <= 0 && (
                        <div className="BuildingAction">
                            {building.currentLevel < building.maxLevel && (
                                <div className="IconUpgrade"></div>
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
    building: PropTypes.object.isRequired,
    onUpgradeBuilding: PropTypes.func.isRequired,
    onCreateBuilding: PropTypes.func.isRequired
};

export default Building;