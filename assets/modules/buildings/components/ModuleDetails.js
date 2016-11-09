import React, { Component, PropTypes } from 'react';
import forEach from 'lodash/forEach'
import map from 'lodash/map'
import { Link } from 'react-router';

class ModuleDetails extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    render() {

        const { module } = this.props;

        return (
            <div>
                <div className="BuildingDetails">
                    <div className="BuildingName">{module.name} </div>
                    <div className="BuildingDescription">{module.description}</div>

                    <div className="BuildingStats">
                    </div>
                </div>
            </div>
        )
    }
}

ModuleDetails.propTypes = {
    module: PropTypes.object.isRequired
};

export default ModuleDetails;
