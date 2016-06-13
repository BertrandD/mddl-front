import React, { Component, PropTypes } from 'react';
import BaseBuildings from './BaseBuildings'
require('./Base.scss');

class Base extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {

        const { base, sBuildings, sItems } = this.props;

        return (
            <div className="Base">
                <h1 className="BaseName">Base : { base.name }</h1>

                <BaseBuildings buildings={base.buildings}
                               onUpgradeBuilding={this.props.onUpgradeBuilding}
                               onCreateBuilding={this.props.onCreateBuilding}
                               sBuildings={sBuildings}
                               sItems={sItems}/>
            </div>
        )
    }
}

Base.propTypes = {
    base: PropTypes.object.isRequired,
    sBuildings: PropTypes.object.isRequired,
    sItems: PropTypes.object.isRequired,
    onUpgradeBuilding: PropTypes.func.isRequired,
    onCreateBuilding: PropTypes.func.isRequired
};

export default Base;
