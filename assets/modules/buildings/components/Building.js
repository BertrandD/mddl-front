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

        const { building, sItems, sBuildings } = this.props;

        if (!building.currentLevel) {
            building.currentLevel = 0;
        }

        return (
            <div className="Building">
                <div className="BuildingHeader">
                    <div className="BuildingName">
                        {building.name} - Lvl {building.currentLevel} {building.endsAt > 0 && (<span><span className="fa fa-arrow-right">&nbsp;</span> {building.currentLevel + 1}</span>)}
                        {building.currentLevel === building.maxLevel && (<span>(max)</span>)}

                    </div>

                    {building.currentLevel === 0 && (
                        <div className="BuildingAction">
                            <div className="IconBuild" onClick={this.upgradeBuilding.bind(this)}></div>
                        </div>
                    ) || building.endsAt <= 0 && (
                        <div className="BuildingAction">
                            {building.currentLevel < building.maxLevel && (
                                <div className="IconUpgrade" onClick={this.upgradeBuilding.bind(this)}></div>
                            )}
                        </div>
                    )}
                </div>
                <div className="BuildingBody" onClick={this.props.onSelectBuilding}>
                    <div className="BuildingImage">
                        <img src="/img/buildings/batiment_01.png" alt=""/>
                    </div>
                </div>
                <div className="BuildingFooter">
                    {building.endsAt > 0 && (
                        <div>
                            <ProgressBar start={building.startedAt} end={building.endsAt} />
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
    onCreateBuilding: PropTypes.func.isRequired,
    onSelectBuilding: PropTypes.func.isRequired
};

export default Building;