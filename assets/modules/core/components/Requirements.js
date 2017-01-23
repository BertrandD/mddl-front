import React, { Component, PropTypes } from 'react';
import format from 'utils/numberFormat'

class Requirements extends Component {

    hasRequirement (requirements, level, requirement) {
        return requirements[level] && requirements[level][requirement] && requirements[level][requirement].length > 0
    }

    render() {

        const { requirements, sItems, sBuildings, level, strings } = this.props;

        return (
            <div>
                {requirements[level] && (
                    <div>
                        {this.hasRequirement(requirements, level, 'buildings') && (
                            <div>
                                <p>{ strings.buildings.word }</p>
                                <ul>
                                    {requirements[level].buildings.map((req) => (
                                        <li key={req.id}>
                                            <span onClick={this.props.onSelectBuilding.bind(null, sBuildings[req.templateId])} className="color-yellow cursor-pointer">{sBuildings[req.templateId].name}:</span> <span className="color-white">{req.level}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {this.hasRequirement(requirements, level, 'items') && (
                            <div>
                                <p>{ strings.items.word }</p>
                                <ul>
                                    {requirements[level].items.map((req) => (
                                        <li key={req.id}>
                                            <span className="color-yellow">{sItems[req.id].name}:</span> <span className="color-white">{format(req.count)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        )
    }
}

Requirements.propTypes = {
    onSelectBuilding: PropTypes.func.isRequired,
    requirements: PropTypes.object.isRequired,
    sItems: PropTypes.object.isRequired,
    sBuildings: PropTypes.object.isRequired,
    strings: PropTypes.object.isRequired,
    level: PropTypes.number.isRequired
};

export default Requirements;
