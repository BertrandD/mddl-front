import React, { Component, PropTypes } from 'react';
import BaseBuildings from './BaseBuildings'
import Planet from '../../core/components/Planet/Planet'

require('./Base.scss');

class Base extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {

        const { base, sBuildings, sItems } = this.props;

        return (
            <div className="Base">
                <div className="BasePlanet">
                    <Planet />
                </div>
                <div className="BaseContent">
                    <BaseBuildings buildings={base.buildings}
                                   onUpgradeBuilding={this.props.onUpgradeBuilding}
                                   onCreateBuilding={this.props.onCreateBuilding}
                                   sBuildings={sBuildings}
                                   sItems={sItems}/>
                </div>
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
