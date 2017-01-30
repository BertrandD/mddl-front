import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Inventory from './components/Inventory'

class InventoryContainer extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { base, strings } = this.props;

        return (
            <div className="Block">
                <div className="BlockTitle">
                    Inventory
                </div>
                <Inventory />
            </div>
        );

    }
}

import { getPopulatedCurrentBase } from 'reducers/baseReducer'
import { getStrings } from 'reducers/userReducer'

function mapStateToProps(state) {
    return { base: getPopulatedCurrentBase(state), strings: getStrings(state) };
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({  }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(InventoryContainer);

