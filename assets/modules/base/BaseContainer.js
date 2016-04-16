import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions/baseActions';

class BaseContainer extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                Hello from { this.props.base.name } !
            </div>
        );
    }
}

function mapStateToProps({ base }) {
    return { base };
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseContainer);

