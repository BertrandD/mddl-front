import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import filter from 'lodash/filter'
import * as ItemTypes from 'types/ItemTypes'


class SpatialElevator extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {number: 1, structure: ''};

        this.handleStructureChange = this.handleStructureChange.bind(this);
        this.handleNumberChange = this.handleNumberChange.bind(this);
    }

    handleStructureChange(event) {
        this.setState({structure: event.target.value});
    }

    handleNumberChange(event) {
        this.setState({number: event.target.value});
    }

    render() {

        const { sBuildings, sItems, strings } = this.props;
        return (
            <div>
                <h3>Lancer la production de vaisseaux</h3>
                <div>
                    Structure :&nbsp;
                    <select value={this.state.structure} onChange={this.handleStructureChange}>
                        <option value=""> </option>
                        {filter(sItems, (b) => b.type == ItemTypes.STRUCTURE).map((b) => (
                            <option key={b.itemId} value={b.itemId}>{b.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    Quantité :&nbsp;
                    <input type="number"
                           value={this.state.number}
                           onChange={this.handleNumberChange}
                           size="5"/>
                </div>
                <div>
                    {this.state.structure && this.state.number > 0 && (
                        <button className="button--primary" onClick={this.props.actions.createShip.bind(null, this.state.structure, this.state.number, [])}>
                            Produire
                        </button>
                    ) || (
                        <button className="button--primary" disabled>
                            Produire
                        </button>
                    )}
                </div>
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
import { createShip } from 'actions/shipActions'

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({ createModule, viewBuildingDetails, createShip }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(SpatialElevator);