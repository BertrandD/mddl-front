import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import ProgressBar from '../../core/components/ProgressBar'
import Duration from '../../core/components/Duration'
import keys from 'lodash/keys'
import map from 'lodash/map'
import './Building.scss';

import ModuleSlot from '../../items/components/ModuleSlot'
import Tooltip from '../../core/components/Tooltip/Tooltip'

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
                    <div className="BuildingHeader BuildingHeaderLevel">
                        {!building.currentLevel && (
                            <span>0</span>
                        ) || (
                            <span>
                                {building.currentLevel}
                                {building.endsAt > 0 && (<span><span className="fa fa-arrow-right">&nbsp;</span> {building.currentLevel + 1}</span>)}
                                {building.currentLevel === building.maxLevel && (<span>(max)</span>)}
                            </span>
                        )}
                    </div>

                    <div className="BuildingHeader BuildingHeaderAction">
                        {!building.currentLevel && (
                            <Tooltip text={"Build"}>
                                <i className="fa fa-cogs cursor-pointer" onClick={this.upgradeBuilding.bind(this)}>
                                </i>
                            </Tooltip>
                        ) || building.endsAt <= 0 && building.currentLevel < building.maxLevel && (
                            <Tooltip text={"Upgrade"}>
                                <i className="fa fa-arrow-up cursor-pointer" onClick={this.upgradeBuilding.bind(this)}>
                                </i>
                            </Tooltip>
                        )}
                    </div>

                    {/*                    <div className="BuildingName">
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
                </div>*/}
                <Tooltip text={building.name}>

                <div className="BuildingBody">
                    <div className="BuildingImage" onClick={this.props.onSelectBuilding}>
                        <img src={"http://dummyimage.com/512x512/0a222c/2898c1.jpg&text="+(building.buildingId || building.id)} alt=""/>
                    </div>
                    {/*<div className="BuildingModules">
                        {map(building.modules, (mod, i) => (
                            <div className="BuildingModule BuildingModuleFull" key={i} onClick={this.props.onSelectModule.bind(null, mod)}>
                                <img src={"http://dummyimage.com/32x32/0a222c/2898c1.jpg&text= "+mod} alt=""/>
                            </div>
                        ))}
                        {[...Array(building.maxModules - (building.modules && building.modules.length || 0))].map((x, i) => (
                            <div className="BuildingModule" key={i} onClick={this.props.onSelectModule.bind(null, null)}>
                                <ModuleSlot modules={building.availableModules} onDropModule={this.props.onAttachModule}/>
                            </div>
                        ))}
                    </div>*/}
                </div>
                </Tooltip>
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
    onSelectModule: PropTypes.func.isRequired,
    onAttachModule: PropTypes.func.isRequired
};

export default Building;