import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import filter from 'lodash/filter'
import range from 'lodash/range'
import map from 'lodash/map'
import * as ItemTypes from 'types/ItemTypes'
import Item from '../../../items/components/Item'
import ItemSlot from '../../../items/components/ItemSlot'
import DraggableItem from '../../../items/components/DraggableItem'
import Text from '../../../core/components/Text'

import './recipe.scss'

class SpatialElevator extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {number: 1, structure: null};

        this.handleStructureChange = this.handleStructureChange.bind(this);
        this.handleNumberChange = this.handleNumberChange.bind(this);
    }

    handleStructureChange(structure) {
        this.setState({structure});
    }

    handleNumberChange(event) {
        this.setState({number: event.target.value});
    }

    render() {

        const { sBuildings, sItems, strings } = this.props;
        const { structure } = this.state;
        return (
            <div>
                <div className="Recipe">
                    <div className="RecipeLeft">
                        {filter(sItems, (b) => b.type == ItemTypes.STRUCTURE).map((b) => (
                            <DraggableItem key={b.itemId} item={b} />
                        ))}
                    </div>
                    <div className="RecipeRight">
                        <h3><Text string="structures.word"/></h3>
                        { structure && (
                            <span>
                                <Item item={structure}/>
                                <span className="cursor-pointer" onClick={this.handleStructureChange.bind(this, null)}>
                                    (<Text string="words.remove"/>)
                                </span>
                            </span>
                        ) || (
                            <ItemSlot target="structure" onDropModule={this.handleStructureChange}/>
                        )}
                        { structure && map(structure.slots, (count, type) => (
                            <div>
                                <hr/>
                                <h3><Text string={"words."+type} /></h3>
                                {map(range(count), () => (
                                    <ItemSlot target={type} onDropModule={this.handleStructureChange}/>
                                ))}
                                {count == 0 && (
                                    <span>
                                        <Text string="structures.noSlot"/> <Text string={"words."+type} />

                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <h3>Lancer la production de vaisseaux</h3>
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