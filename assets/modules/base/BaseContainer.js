import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createBase } from './actions/baseActions';
import { fetchBase } from './actions/baseActions';
import { openPopup } from '../core/actions/popupActions'
import { fetchBuildings } from '../static/actions/staticActions'
import { Link } from 'react-router';
import Base from './components/Base'

class BaseContainer extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { currentBase, sBuildings, buildings } = this.props;
        if (!currentBase) {
            return (
                <div>
                    Loading base...
                </div>
            )
        }
        return (
            <div>
                <Base onSelectCell={this.props.actions.openPopup}
                      sBuildings={this.props.sBuildings}
                      base={currentBase} />
            </div>
        );

    }
}

import { getPopulatedCurrentBase } from './reducers/baseReducer'
import { getStaticBuildings } from '../static/reducers/staticReducer'

function mapStateToProps(state) {
    return { currentBase: getPopulatedCurrentBase(state), sBuildings: getStaticBuildings(state)  };
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({ createBase, fetchBuildings, openPopup, fetchBase }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseContainer);

