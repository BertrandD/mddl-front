import React, { Component, PropTypes } from 'react';

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
                            {building.level}
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

    render() {
        return (
            <div>
                <h2>Base : { this.props.base.name }</h2>

                <h4>Buildings : </h4>

                { this.props.base.buildings && this.props.base.buildings.length > 0 ? this.renderBuildings() : 'No buildings' }

                <h4>Available buildings : </h4>

                { this.props.staticBuildings.map((building, index) => (
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
    staticBuildings: PropTypes.array.isRequired
};

export default Base;
