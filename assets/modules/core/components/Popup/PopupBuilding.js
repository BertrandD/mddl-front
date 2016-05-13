import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { upgradeBuilding } from '../../../base/actions/buildingActions'
import Timer from '../../../core/components/Timer'
import ProgressBar from '../../../core/components/ProgressBar'


export class PopupBuildingTitle extends Component {
    render () {
        const { building } = this.props;

        return (
            <span>
               {this.props.sBuilding.name}
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

    constructor(props, ctx) {
        super(props, ctx);
        this.state = {
            error: ''
        }
    }
    handleUpgrade (building) {
        this.props.actions.upgradeBuilding(this.props.base, building).catch(res => {
            this.setState({error:res.meta.message});
        });
    }

    render() {
        const { building, sBuilding } = this.props;

        return (
            <div>
                <div>
                    {sBuilding.description}
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

                    { sBuilding.requirements[building.currentLevel].resources.map((resource) => (
                       <div>
                           {items[resource.id].name} : {resource.count}
                       </div>
                    ))}

                    {building.queue && building.queue.map(event => {
                        return (
                            <span key={event.id}>
                                &nbsp;<i className="fa fa-arrow-right"> </i> {event.level}
                            </span>
                        );
                    })}
                </div>
                <button onClick={this.handleUpgrade.bind(this, building)}>Upgrade</button>
                {this.state.error}

            </div>
        );
    }
}

function mapStateToProps({ popup, entities, currentBase }) {
    return { items:entities.staticItems, base: entities.bases[currentBase.id], building: entities.buildings[popup.data.id], sBuilding: entities.staticBuildings[popup.data.buildingId] };
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({ upgradeBuilding }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(PopupBuilding);