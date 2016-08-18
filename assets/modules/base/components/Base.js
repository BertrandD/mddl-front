import React, { Component, PropTypes } from 'react';
import Planet from '../../core/components/Planet/Planet'
import map from 'lodash/map'
import { Link } from 'react-router';
import format from '../../../utils/numberFormat'
import BaseBuildingsContainer from '../BaseBuildingsContainer'
require('./Base.scss');

class Base extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {

        const { base } = this.props;

        return (
            <div className="Base">
                <div className="BaseName">
                    Base : { base.name || "¤" }
                </div>

                <BaseBuildingsContainer base={base}>
                </BaseBuildingsContainer>
            </div>
        )
    }
}

Base.propTypes = {
    base: PropTypes.object.isRequired
};

export default Base;
