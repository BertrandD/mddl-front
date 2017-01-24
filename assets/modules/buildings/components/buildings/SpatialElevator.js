import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import filter from 'lodash/filter'
import * as ItemTypes from 'types/ItemTypes'


class SpatialElevator extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {

        const { sBuildings, sItems, strings } = this.props;

        return (
            <div>
                <h3>Lancer la production de vaisseaux</h3>
                {filter(sItems, (b) => b.type == ItemTypes.STRUCTURE).map((b) => (
                    <div>
                        {b.name}
                    </div>
                ))}
            </div>
        )
    }
}

SpatialElevator.propTypes = {
};

import { getStaticBuildings, getStaticItems } from 'reducers/staticReducer'
import { getStrings } from 'reducers/userReducer'

function mapStateToProps(state, ownProps) {
    return { sItems: getStaticItems(state), sBuildings: getStaticBuildings(state), strings: getStrings(state) };
}

import { createModule, viewBuildingDetails } from 'actions/buildingActions'

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({ createModule, viewBuildingDetails }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(SpatialElevator);