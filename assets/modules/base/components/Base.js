import React, { Component, PropTypes } from 'react';
import Timer from '../../core/components/Timer'
import map from 'lodash/map'

class Base extends Component {

    constructor(props, context) {
        super(props, context);
    }

    renderBuildings() {
        return (
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Level</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                { this.props.base.buildings.map((building, index) => (
                    <tr key={index}>
                        <td>
                            {building.buildingId}
                        </td>
                        <td>
                            {building.currentLevel}
                        </td>
                        <td>
                            <button disabled>Upgrade</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        )
    }

    renderBuildingQueue () {
        return (
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Level</th>
                    <th>Time left</th>
                </tr>
                </thead>
                <tbody>
                { this.props.base.buildingQueue.map((building, index) => (
                    <tr key={index}>
                        <td>
                            {building.buildingId}
                        </td>
                        <td>
                            {building.currentLevel} --> {building.currentLevel + 1}
                        </td>
                        <td>
                            <Timer end={building.endsAt}/>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        )
    }

    render() {
        return (
            <div>
                <h2>Base : { this.props.base.name }</h2>

                <h4>Buildings : </h4>

                { this.props.base.buildings && this.props.base.buildings.length > 0 ? this.renderBuildings() : 'No buildings' }

                <h4>Building Queue : </h4>

                { this.props.base.buildingQueue && this.props.base.buildingQueue.length > 0 ? this.renderBuildingQueue() : 'No buildings' }

                <h4>Available buildings : </h4>

                { map(this.props.staticBuildings, (building, index) => (
                    <div key={index}>
                        {building.name}
                        <button onClick={this.props.onCreateBuilding.bind(this, building)}>Build</button>
                    </div>
                ))}


            </div>
        )
    }
}

Base.propTypes = {
    base: PropTypes.object.isRequired,
    onCreateBuilding: PropTypes.func.isRequired,
    staticBuildings: PropTypes.object.isRequired
};

export default Base;
