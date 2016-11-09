import React, { Component, PropTypes } from 'react';
import map from 'lodash/map'

class BuildingModulesList extends Component {
    render () {
        const { sItems, modules, strings } = this.props;

        return (
            <div>
                {strings.buildings.modules.canBeAttached}
                {map(modules, (mod) => (
                    <ul key={mod}>
                        <li>
                            {sItems[mod].name}
                        </li>
                    </ul>
                ))}
            </div>
        )
    }
}

BuildingModulesList.propTypes = {
    sItems: PropTypes.object.isRequired,
    strings: PropTypes.object.isRequired,
    modules: PropTypes.array.isRequired
};

export default BuildingModulesList;
