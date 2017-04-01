import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Base from './components/Base'

class BaseContainer extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { base, strings } = this.props;
        if (!base) {
            return (
                <div>
                    { strings.app.loading }
                </div>
            )
        }
        return (
            <div>
                <Base base={base} strings={strings} />
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

export default connect(mapStateToProps, mapDispatchToProps)(BaseContainer);

