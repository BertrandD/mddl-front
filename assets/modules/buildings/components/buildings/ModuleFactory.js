import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class ModuleFactory extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {

        const { building, sItems } = this.props;

        console.log(this.props);

        return (
            <div>
                <h3>
                    Modules disponibles :
                </h3>

                {building.modules[building.currentLevel].map((module) => (
                    <div key={module}>
                        <span className="color-yellow">
                            {sItems[module].name}
                        </span>
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

export default ModuleFactory;