import React, { Component, PropTypes } from 'react';
import forEach from 'lodash/forEach'
import map from 'lodash/map'
import { Link } from 'react-router';
import ProgressBar from '../../core/components/ProgressBar'
import BuildingList from '../../buildings/components/BuildingList'
import Duration from '../../core/components/Duration'
import Requirements from '../../core/components/Requirements'
import format from 'utils/numberFormat'

class BuildingDetails extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {};
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
                                    <p className="color-yellow">Prérequis pour le niveau {building.currentLevel + 1 || 1}:</p>

                                    <Requirements requirements={building.requirements} level={building.currentLevel + 1 || 1} sItems={sItems} sBuildings={sBuildings} />

                                    <div className="margin-bottom-inner">
                                        <span className="color-yellow">Temps de construction : </span>
                                        <span className="color-white">
                                            <Duration milliseconds={building.buildTimes[building.currentLevel || 0]} />
                                        </span>
                                    </div>

                                    <div className="margin-bottom-inner">
                                        <span className="color-yellow">Modules : </span>
                                        <span className="color-white">
                                            {building.modules && building.modules.length || 0} / {building.maxModules}
                                        </span>
                                    </div>

                                    <Link to={"/base/buildings/" + building.id}>
                                        <button className="button--primary">
                                            Inspecter
                                        </button>
                                    </Link>

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
