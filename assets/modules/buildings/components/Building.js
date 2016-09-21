import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
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

        const { building, strings } = this.props;

        return (
            <div className="Building">
                <div className="BuildingHeader">
                    <div className="BuildingName">
                        {!building.currentLevel && (
                            <span>{building.name}</span>
                        ) || (
                            <Link to={"/base/buildings/" + building.id}>
                                {building.name} <span>- { strings.app.lvl } {building.currentLevel}</span>
                            </Link>
                        )}

                        {building.endsAt > 0 && (<span><span className="fa fa-arrow-right">&nbsp;</span> {building.currentLevel + 1}</span>)}
                        {building.currentLevel === building.maxLevel && (<span>(max)</span>)}

                    </div>

                    {!building.currentLevel && (
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
                <div className="BuildingBody">
                    <div className="BuildingImage" onClick={this.props.onSelectBuilding}>
                        <img src={"http://dummyimage.com/512x512/0a222c/2898c1.jpg&text="+(building.buildingId || building.id)} alt=""/>
                    </div>
                    <div className="BuildingModules" onClick={this.props.onSelectModule.bind(null, null)}>
                        {[...Array(building.maxModules)].map((x, i) => (
                            <div className="BuildingModule" key={i}>
                                <img src={"http://dummyimage.com/32x32/0a222c/2898c1.jpg&text= mod"} alt=""/>
                            </div>
                        ))}
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
    strings: PropTypes.object.isRequired,
    building: PropTypes.object.isRequired,
    onUpgradeBuilding: PropTypes.func.isRequired,
    onCreateBuilding: PropTypes.func.isRequired,
    onSelectBuilding: PropTypes.func.isRequired,
    onSelectModule: PropTypes.func.isRequired
};

export default Building;