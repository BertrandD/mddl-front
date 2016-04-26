import React, { Component, PropTypes } from 'react';
import Timer from '../../core/components/Timer'
import ProgressBar from '../../core/components/ProgressBar'
import map from 'lodash/map'
import filter from 'lodash/filter'
import reduce from 'lodash/reduce'

require('./Base.scss');

class Base extends Component {

    constructor(props, context) {
        super(props, context);
    }

    getAvailableBuildings () {

        const buildingIds = reduce([...this.props.base.buildings], (result, id) => {
            result.push(this.props.buildings[id].buildingId);
            return result;
        }, []);
        return filter(this.props.staticBuildings, (staticBuilding) => {
            return !buildingIds.some((buildingId) => buildingId === staticBuilding.id)
        })
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
                { this.props.base.buildings.map((id, index) =>  {
                    const building = this.props.buildings[id];
                    return (
                        <tr key={index}>
                            <td>
                                {this.props.staticBuildings[building.buildingId].name}
                            </td>
                            <td>
                                { building.endsAt > 0 && (
                                    <span>
                                        {building.currentLevel} <i className="fa fa-arrow-right"> </i> {building.currentLevel + 1}
                                        <ProgressBar id={building.id} start={building.startedAt} end={building.endsAt} text={(
                                            <Timer end={building.endsAt}/>
                                        )}/>
                                    </span>
                                ) || building.currentLevel}
                                {building.queue && building.queue.map(event => {
                                    return (
                                        <span key={event.id}>
                                            &nbsp;<i className="fa fa-arrow-right"> </i> {event.level}
                                        </span>
                                    );
                                })}
                            </td>
                            <td>
                                <button onClick={this.props.onUpgradeBuilding.bind(this, building)}>Upgrade</button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        )
    }

    renderBaseBuildings () {
        const cells = [];

        for (var i = 1; i <= 9; i++) {
            cells.push(
                <div id="pos{i}"
                     class="cell emptyCell">
                </div>
            );
        }

        return cells;
    }

    render() {
        return (
            <div className="Base">
                <h2>{ this.props.base.name }</h2>

                <div id="buildings">
                    {this.renderBaseBuildings()}
                </div>

            </div>
        )
    }
}

Base.propTypes = {
    base: PropTypes.object.isRequired,
    buildings: PropTypes.object.isRequired,
    onCreateBuilding: PropTypes.func.isRequired,
    onUpgradeBuilding: PropTypes.func.isRequired,
    staticBuildings: PropTypes.object.isRequired
};

export default Base;
