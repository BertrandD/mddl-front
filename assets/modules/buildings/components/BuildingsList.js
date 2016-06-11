import React, { Component, PropTypes } from 'react';
import './BuildingsList.scss'

class BaseBuildingsList extends Component {

    render() {

        const { buildings } = this.props;
        console.log(buildings);
        return (
            <div>
                {buildings.map((building) => {
                    return (
                        <div>
                            {building.name} - Level {building.currentLevel}
                        </div>
                    )
                })}
            </div>
        )
    }
}

BaseBuildingsList.propTypes = {
    base: PropTypes.array.isRequired
};

export default BaseBuildingsList;
