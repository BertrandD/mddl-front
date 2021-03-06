import React, { Component, PropTypes } from 'react';
import Link from '../../core/components/Link';
import Duration from '../../core/components/Duration'
import Requirements from '../../core/components/Requirements'

class BuildingDetails extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    render() {

        const { building, sItems, sBuildings, strings } = this.props;

        return (
            <div className="BaseBuildings">
                {building && (
                    <div className="BuildingDetails">
                        <div className="BuildingName">{building.name} {building.currentLevel && (<span> - { strings.app.lvl } {building.currentLevel}</span>)}</div>
                        <div className="BuildingDescription">{building.description}</div>

                        <div className="BuildingStats">
                            <p className="margin-bottom-inner">
                                { strings.buildings.consumption} <span className="fa fa-bolt color-yellow"> </span> <span className="color-white">{building.useEnergy[building.currentLevel-1] || 0}</span>
                            </p>
                                <div className="BuildingRequirements">
                                    <p className="color-yellow">{ strings.requirements.forLevel } {building.currentLevel + 1 || 1}:</p>

                                    <Requirements strings={strings}
                                                  onSelectBuilding={this.props.onSelectBuilding}
                                                  requirements={building.requirements}
                                                  level={building.currentLevel + 1 || 1}
                                                  sItems={sItems}
                                                  sBuildings={sBuildings} />

                                    <div className="margin-bottom-inner">
                                        <span className="color-yellow">{ strings.buildings.buildTime } </span>
                                        <span className="color-white">
                                            <Duration milliseconds={building.buildTimes[building.currentLevel || 0]} />
                                        </span>
                                    </div>

                                    <div className="margin-bottom-inner">
                                        <span className="color-yellow">{ strings.modules.word } </span>
                                        <span className="color-white">
                                            {building.modules && building.modules.length || 0} / {building.maxModules}
                                        </span>
                                    </div>

                                    <Link to={"/base/buildings/" + building.id}>
                                        <button className="button--primary">
                                            { strings.app.inspect }
                                        </button>
                                    </Link>
                                    {building.currentLevel && (
                                        <button className="button--primary" onClick={this.props.onUpgradeBuilding}>
                                            { strings.buildings.upgrade }
                                        </button>
                                    ) || (
                                        <button className="button--primary" onClick={this.props.onCreateBuilding}>
                                            { strings.buildings.build }
                                        </button>
                                    )}



                                </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

BuildingDetails.propTypes = {
    strings: PropTypes.object.isRequired,
    sItems: PropTypes.object.isRequired,
    sBuildings: PropTypes.object.isRequired,
    onSelectBuilding: PropTypes.func.isRequired,
    onUpgradeBuilding: PropTypes.func.isRequired,
    onCreateBuilding: PropTypes.func.isRequired
};

export default BuildingDetails;
