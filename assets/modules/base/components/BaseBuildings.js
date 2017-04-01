import React, { Component, PropTypes } from 'react';
import forEach from 'lodash/forEach'
import BuildingList from '../../buildings/components/BuildingList'

require('./Base.scss');

class BaseBuilings extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {layout: ''};

        this.toggleLayoutChange = this.toggleLayoutChange.bind(this);
    }

    toggleLayoutChange() {
        this.setState({layout:this.state.layout == 'table' ? 'grid' : 'table'});
    }

    render() {

        const { buildings, sBuildings, strings } = this.props;
        const buildingsAvailable = [];

        forEach(sBuildings, (sBuilding) => {
            //if (!buildings.some(b => b.buildingId === sBuilding.id)) {
                buildingsAvailable.push(sBuilding);
            //}
        });

        return (
            <div className="BaseBuildings">
                <span className="cursor-pointer" onClick={this.toggleLayoutChange}>Toggle layout</span>
                <h2>{ strings.buildings.your }</h2>
                <BuildingList strings={strings}
                              layout={this.state.layout}
                              buildings={buildings}
                              onUpgradeBuilding={this.props.onUpgradeBuilding}
                              onCreateBuilding={this.props.onCreateBuilding}
                              onSelectBuilding={this.props.onSelectBuilding.bind(null)}
                              onSelectModule={this.props.onSelectModule.bind(null)}
                              onAttachModule={this.props.onAttachModule.bind(null)}/>

                <h2>{ strings.buildings.available }</h2>
                <BuildingList strings={strings}
                              layout={this.state.layout}
                              buildings={buildingsAvailable}
                              onUpgradeBuilding={this.props.onUpgradeBuilding}
                              onCreateBuilding={this.props.onCreateBuilding}
                              onSelectBuilding={this.props.onSelectBuilding.bind(null)}
                              onSelectModule={this.props.onSelectModule.bind(null)}
                              onAttachModule={this.props.onAttachModule.bind(null)}/>

            </div>
        )
    }
}

BaseBuilings.propTypes = {
    buildings: PropTypes.array.isRequired,
    sBuildings: PropTypes.object.isRequired,
    onUpgradeBuilding: PropTypes.func.isRequired,
    onCreateBuilding: PropTypes.func.isRequired,
    onSelectBuilding: PropTypes.func.isRequired,
    onSelectModule: PropTypes.func.isRequired,
    onAttachModule: PropTypes.func.isRequired,
    strings: PropTypes.object.isRequired
};

export default BaseBuilings;
