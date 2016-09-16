import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

class ModuleFactory extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {

        const { building, sItems, actions } = this.props;


        return (
            <div>
                <h3>
                    Modules disponibles :
                </h3>

                {building.modules[building.currentLevel] && building.modules[building.currentLevel].map((module) => (
                    <div key={module} className="margin-bottom-inner">
                        <span className="color-yellow">
                            {sItems[module].name}
                        </span>
                        &nbsp;<button className="button--primary" onClick={actions.createModule.bind(null, module)}>
                            Produire 1
                        </button>
                    </div>
                ))}
            </div>
        )
    }
}

ModuleFactory.propTypes = {
    building: PropTypes.object.isRequired,
    sItems: PropTypes.object.isRequired
};



function mapStateToProps(state, ownProps) {
    return {  };
}

import { createModule } from 'actions/buildingActions'

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({ createModule }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(ModuleFactory);