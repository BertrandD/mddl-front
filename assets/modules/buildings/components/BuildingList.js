import React, { Component, PropTypes } from 'react';
import ProgressBar from '../../core/components/ProgressBar'
import Link from '../../core/components/Link';
import Building from './Building'
import map from 'lodash/map'
import './BuildingList.scss';

import ModuleSlot from '../../items/components/ModuleSlot'


class BuildingList extends Component {

    constructor(props, context) {
        super(props, context);
    }

    upgradeBuilding (building) {
        if (!building.currentLevel) {
            this.props.onCreateBuilding(building);
        } else {
            this.props.onUpgradeBuilding(building);
        }
    }


    render() {

        const { buildings, strings, layout } = this.props;

        return (
            <div className="BuildingList">
                {layout == "table" && (
                    <table className="table">
                        <thead>
                        <tr>
                            <th>&nbsp;</th>
                            <th>Building name</th>
                            <th>Modules</th>
                            <th>Level</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {buildings.map((building, index) => (
                            <tr key={index} onClick={this.props.onSelectBuilding}>
                                <td>
                                    <img src={"http://dummyimage.com/32x32/0a222c/2898c1.jpg&text="+(building.buildingId || building.id)} alt=""/>
                                </td>
                                <td>
                                    {!building.currentLevel && (
                                        <span>{building.name}</span>
                                    ) || (
                                        <Link to={"/base/buildings/" + building.id}>
                                            {building.name}
                                        </Link>
                                    )}
                                </td>
                                <td>
                                    {map(building.modules, (mod) => (
                                        <div className="BuildingModule BuildingModuleFull" key={mod} onClick={this.props.onSelectModule.bind(null, mod)}>
                                            <img src={"http://dummyimage.com/32x32/0a222c/2898c1.jpg&text= "+mod} alt=""/>
                                        </div>
                                    ))}
                                    {[...Array(building.maxModules - (building.modules && building.modules.length || 0))].map((x, i) => (
                                        <div className="BuildingModule" key={i} onClick={this.props.onSelectModule.bind(null, null)}>
                                            <ModuleSlot modules={building.availableModules} onDropModule={this.props.onAttachModule}/>
                                        </div>
                                    ))}
                                </td>
                                <td>
                                    {building.currentLevel}
                                </td>
                                <td>
                                    {!building.currentLevel && (
                                        <div className="BuildingAction">
                                            <div className="IconBuild" onClick={this.upgradeBuilding.bind(this, building)}></div>
                                        </div>
                                    ) || building.endsAt <= 0 && (
                                        <div className="BuildingAction">
                                            {building.currentLevel < building.maxLevel && (
                                                <div className="IconUpgrade" onClick={this.upgradeBuilding.bind(this, building)}></div>
                                            )}
                                        </div>
                                    )}
                                    {building.endsAt > 0 && (
                                        <ProgressBar start={building.startedAt} end={building.endsAt} />
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) || buildings.map((building, index) => (
                    <Building key={index}
                              building={building}
                              strings={strings}
                              onUpgradeBuilding={this.props.onUpgradeBuilding.bind(null, building)}
                              onCreateBuilding={this.props.onCreateBuilding.bind(null, building)}
                              onSelectBuilding={this.props.onSelectBuilding.bind(null, building)}
                              onSelectModule={this.props.onSelectModule.bind(null, building)}
                              onAttachModule={this.props.onAttachModule.bind(null, building)}/>
                ))}

            </div>
        )
    }
}

BuildingList.propTypes = {
    strings: PropTypes.object.isRequired,
    layout: PropTypes.string,
    buildings: PropTypes.array.isRequired,
    onUpgradeBuilding: PropTypes.func.isRequired,
    onCreateBuilding: PropTypes.func.isRequired,
    onSelectBuilding: PropTypes.func.isRequired,
    onSelectModule: PropTypes.func.isRequired,
    onAttachModule: PropTypes.func.isRequired
};

export default BuildingList;