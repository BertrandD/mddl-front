import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { upgradeBuilding, createBuilding } from '../buildings/actions/buildingActions'
import { Link } from 'react-router';
import Base from './components/Base'

class BaseContainer extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { currentBase, sBuildings, sItems, actions } = this.props;
        if (!currentBase) {
            return (
                <div>
                    Loading base...
                </div>
            )
        }
        return (
            <div>
                <Base sBuildings={sBuildings}
                      sItems={sItems}
                      onUpgradeBuilding={actions.upgradeBuilding.bind(null, currentBase)}
                      onCreateBuilding={actions.createBuilding.bind(null, currentBase)}
                      base={currentBase} />
            </div>
        );

    }
}

import { getPopulatedCurrentBase } from './reducers/baseReducer'
import { getStaticBuildings, getStaticItems } from '../static/reducers/staticReducer'

function mapStateToProps(state) {
    return { currentBase: getPopulatedCurrentBase(state), sBuildings: getStaticBuildings(state), sItems: getStaticItems(state)  };
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({ upgradeBuilding, createBuilding }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseContainer);

