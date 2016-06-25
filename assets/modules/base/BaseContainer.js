import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import Base from './components/Base'

class BaseContainer extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { base } = this.props;
        if (!base) {
            return (
                <div>
                    Loading base...
                </div>
            )
        }
        return (
            <div>
                <Base base={base} />
            </div>
        );

    }
}

import { getPopulatedCurrentBase } from './reducers/baseReducer'

function mapStateToProps(state) {
    return { base: getPopulatedCurrentBase(state) };
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({  }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseContainer);

