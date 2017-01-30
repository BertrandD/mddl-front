import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import filter from 'lodash/filter'
import DraggableItem from '../../items/components/DraggableItem'
import * as ItemTypes from '../../../../core/types/ItemTypes'
import Text from '../../core/components/Text'

import './inventory.scss'

class Inventory extends Component {

    constructor(props, context) {
        super(props, context);
        console.log(props);
        this.state = {Ifilter: props.defaultPane || 'STRUCTURE'};

        this.handleFilterChange = this.handleFilterChange.bind(this);
    }

    handleFilterChange(Ifilter) {
        this.setState({Ifilter});
    }

    render() {
        const { sItems, inventory } = this.props;
        const { Ifilter } = this.state;
        const tabs = [ItemTypes.STRUCTURE, ItemTypes.MODULE];
        return (
            <div className="Inventory">
                <div className="InventoryPanes">
                    {tabs.map((tab) => (
                        <span key={tab} className={ Ifilter == tab ? "InventoryPanesActive" : ""} onClick={this.handleFilterChange.bind(this, tab)}>
                            <Text string={"words."+tab}/>
                        </span>
                    ))}
                </div>
                <div className="InventoryContent">
                    {filter(inventory, (b) => b.type == Ifilter).map((b) => (
                        <span>
                            <DraggableItem key={b.templateId} item={sItems[b.templateId]} />
                            &nbsp;x {b.count}
                        </span>
                    ))}
                </div>
            </div>
        )
    }
}

Inventory.propTypes = {
    defaultPane: PropTypes.string
};

import { getStaticBuildings, getStaticItems } from 'reducers/staticReducer'
import { getInventory } from 'reducers/baseReducer'

function mapStateToProps(state, ownProps) {
    return { sItems: getStaticItems(state), sBuildings: getStaticBuildings(state), inventory: getInventory(state), defaultPane: ownProps.defaultPane };
}

import { createModule, viewBuildingDetails } from 'actions/buildingActions'
import { createShip } from 'actions/shipActions'

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({ createModule, viewBuildingDetails, createShip }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);