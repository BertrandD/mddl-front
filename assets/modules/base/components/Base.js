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

    renderBaseBuildings () {
        const cells = [];

        let building;
        for (var i = 0; i < 9; i++) {
            if (this.props.base.buildingPositions[i]) {
                building = this.props.buildings[this.props.base.buildingPositions[i]];

                cells.push(
                    <div key={i} id={"pos"+(i+1)}
                         onClick={this.props.onSelectCell.bind(null, PopupTypes.BUILDING,  {position: i, building})}
                         className="cell">

                        { building.endsAt > 0 && (
                            <div>
                                <div className="level">
                                    {building.currentLevel} <i className="fa fa-arrow-right"> </i> {building.currentLevel + 1}
                                </div>
                                <ProgressBar id={building.id} start={building.startedAt} end={building.endsAt} />
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
                         onClick={this.props.onSelectCell.bind(null, PopupTypes.EMPTY_CELL,  {position: i})}
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
                    Coming soon !
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
