import React, { Component, PropTypes } from 'react';
import Timer from '../../core/components/Timer'
import ProgressBar from '../../core/components/ProgressBar'
import Popup from '../../core/components/Popup/Popup.js';
import map from 'lodash/map'
import filter from 'lodash/filter'
import reduce from 'lodash/reduce'
import * as PopupTypes from '../../core/components/Popup/PopupTypes'
import BuildingsList from './../../buildings/components/BuildingsList'

require('./Base.scss');

class Base extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {

        return (
            <div className="Base">
                <h2>Base : { this.props.base.name }</h2>

                <div id="buildings">
                    <BuildingsList buildings={this.props.base.buildings}/>
                </div>
            </div>
        )
    }
}

Base.propTypes = {
    base: PropTypes.object.isRequired,
    sBuildings: PropTypes.object.isRequired,
    onSelectCell: PropTypes.func.isRequired
};

export default Base;
