import React, { Component, PropTypes } from 'react';
import BaseBuildingsContainer from '../BaseBuildingsContainer'
require('./Base.scss');

class Base extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {

        const { base, strings } = this.props;

        return (
            <div className="Base">
                <div className="BlockTitle">
                    { strings.base.word } : { base.name || "¤" }
                </div>

                <BaseBuildingsContainer base={base} />
            </div>
        )
    }
}

Base.propTypes = {
    base: PropTypes.object.isRequired,
    strings: PropTypes.object.isRequired
};

export default Base;
