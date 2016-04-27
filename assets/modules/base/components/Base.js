import React, { Component, PropTypes } from 'react';
import Timer from '../../core/components/Timer'
import ProgressBar from '../../core/components/ProgressBar'
import Popup from '../../core/components/Popup/Popup.js';
import map from 'lodash/map'
import filter from 'lodash/filter'
import reduce from 'lodash/reduce'
import * as PopupTypes from '../../core/components/Popup/PopupTypes'

require('./Base.scss');

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
        const buildings = [];

        map(this.props.base.buildings, (id) => {
            buildings.push(this.props.buildings[id]);
        });
        let building;
        for (var i = 0; i < 9; i++) {
            if (buildings[i]) {
                building = buildings[i];

                cells.push(
                    <div key={i} id={"pos"+(i+1)}
                         onClick={this.props.onSelectCell.bind(null, PopupTypes.BUILDING,  building)}
                         className="cell">
                        <img src="http://placehold.it/60x60" />

                        { building.endsAt > 0 && (
                            <div className="level">
                                {building.currentLevel} <i className="fa fa-arrow-right"> </i> {building.currentLevel + 1}
                                <ProgressBar id={building.id} start={building.startedAt} end={building.endsAt} text={(
                                    <Timer end={building.endsAt}/>
                                )}/>
                            </div>
                        ) || (
                            <div className="level">
                                {building.currentLevel}
                            </div>
                        )}

                    </div>
                )
            } else {
                cells.push(
                    <div key={i} id={"pos"+(i+1)}
                         onClick={this.props.onSelectCell.bind(null, PopupTypes.EMPTY_CELL,  buildings[i])}
                         className="cell emptyCell">
                    </div>
                );
            }
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
    onSelectCell: PropTypes.func.isRequired,
    staticBuildings: PropTypes.object.isRequired
};

export default Base;
