import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { upgradeBuilding } from '../../../base/actions/buildingActions'
import Timer from '../../../core/components/Timer'
import ProgressBar from '../../../core/components/ProgressBar'


export class PopupBuildingTitle extends Component {
    render () {
        const building = this.props.entities.buildings[this.props.popup.data.id];

        return (
            <span>
               {this.props.entities.staticBuildings[this.props.popup.data.buildingId].name}
                | Level {building.currentLevel}

                { building.endsAt > 0 && (
                    <span>
                        &nbsp;<i className="fa fa-arrow-right"> </i> {building.currentLevel + 1}
                    </span>
                )}

            </span>
        )
    }
}

class PopupBuilding extends Component {

    handleUpgrade (building) {
        this.props.actions.upgradeBuilding(this.props.entities.bases[this.props.currentBase.id], building)
    }

    render() {
        const building = this.props.entities.buildings[this.props.popup.data.id];

        return (
            <div>
                <div>
                    {this.props.entities.staticBuildings[this.props.popup.data.buildingId].description}
                </div>
                <div>
                    { building.endsAt > 0 && (
                        <span>
                            {building.currentLevel} <i className="fa fa-arrow-right"> </i> {building.currentLevel + 1}
                            <ProgressBar id={building.id} start={building.startedAt} end={building.endsAt} text={(
                                    <Timer end={building.endsAt}/>
                            )}/>
                        </span>
                    )}
                    {building.queue && building.queue.map(event => {
                        return (
                            <span key={event.id}>
                                &nbsp;<i className="fa fa-arrow-right"> </i> {event.level}
                            </span>
                        );
                    })}
                </div>
                <button onClick={this.handleUpgrade.bind(this, building)}>Upgrade</button>

            </div>
        );
    }
}

function mapStateToProps({ popup, entities, currentBase }) {
    return { popup, entities, currentBase };
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({ upgradeBuilding }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(PopupBuilding);