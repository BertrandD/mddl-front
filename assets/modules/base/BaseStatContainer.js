import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import Base from './components/Base'
import format from '../../utils/numberFormat'

class BaseStatContainer extends Component {

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
            <div className="Block">
                <h2>Statisitiques de la base :</h2>
                <p>
                    <span className="color-yellow fa fa-shield"> </span> {format(base.baseStat.BASE_SHIELD)} / {format(base.baseStat.BASE_MAX_SHIELD)}
                </p>
                <p>
                    <span className="color-yellow fa fa-heart"> </span> {format(base.baseStat.BASE_HEALTH)} / {format(base.baseStat.BASE_MAX_HEALTH)}
                </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(BaseStatContainer);

