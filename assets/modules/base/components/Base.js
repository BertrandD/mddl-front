import React, { Component, PropTypes } from 'react';
import Timer from '../../core/components/Timer'
import ProgressBar from '../../core/components/ProgressBar'
import map from 'lodash/map'
import filter from 'lodash/filter'
import reduce from 'lodash/reduce'

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
                                        <ProgressBar id={building.id} text={
                                        <span>
                                            {building.currentLevel} --> {building.currentLevel + 1}
                                        </span>
                                        } start={building.startedAt} end={building.endsAt}/>
                                    </span>
                                ) || building.currentLevel}
                                {building.queue && building.queue.map(event => {
                                    return (
                                        <span key={event.id}>
                                            --> {event.level}
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

    render() {
        return (
            <div>
                <h2>Base : { this.props.base.name }</h2>

                <h4>Buildings : </h4>

                { this.props.base.buildings && this.props.base.buildings.length > 0 ? this.renderBuildings() : 'No buildings' }

                <h4>Available buildings : </h4>

                <div className="list">
                    { map(this.getAvailableBuildings(), (building, index) => (
                        <div key={index} className="list__item">
                            <div className="list__item__image">
                                <img src="http://placehold.it/80x80" alt={building.name}/>
                            </div>
                            <div className="list__item__body">
                                <div className="list__item__title">
                                    {building.name}
                                </div>
                                <div className="list__item__description">
                                    {building.description}
                                </div>
                            </div>
                            <div className="list__item__actions">
                                <button onClick={this.props.onCreateBuilding.bind(this, building)}>Build</button>
                            </div>
                        </div>
                    ))}
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
