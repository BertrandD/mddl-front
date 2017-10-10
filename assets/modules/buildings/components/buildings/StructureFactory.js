import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Requirements from '../../../core/components/Requirements'

class StructureFactory extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {

        const { base, building, sItems, sBuildings, actions, strings } = this.props;
        console.log(strings);
        return (
            <div>
                <h3>
                    { strings.structures.available }
                </h3>
                {building.itemsByLevel[building.currentLevel] && [...Array(building.currentLevel)].map((x, i) => building.itemsByLevel[i+1].map((structure) => (
                    <div key={structure} className="margin-bottom-inner Block">
                        <span className="color-yellow">
                            {sItems[structure].name}
                        </span>
                        &nbsp;
                        <button className="float-right button--primary" onClick={actions.createStructure.bind(null, base, building, structure)}>
                            { strings.structures.create }
                        </button>

                        <div>
                            { strings.requirements.word }

                            <Requirements strings={strings}
                                          onSelectBuilding={this.props.viewBuildingDetails}
                                          requirements={{0: sItems[structure].requirement}}
                                          level={0}
                                          sItems={sItems}
                                          sBuildings={sBuildings} />
                        </div>
                    </div>
                )))}
            </div>
        )
    }
}

StructureFactory.propTypes = {
    building: PropTypes.object.isRequired,
    base: PropTypes.object.isRequired
};

import { getStaticBuildings, getStaticItems } from 'reducers/staticReducer'
import { getStrings } from 'reducers/userReducer'

function mapStateToProps(state, ownProps) {
    return { sItems: getStaticItems(state), sBuildings: getStaticBuildings(state), strings: getStrings(state) };
}

import { createStructure, viewBuildingDetails } from 'actions/buildingActions'

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({ createStructure, viewBuildingDetails }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(StructureFactory);