import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createBuilding } from '../../../base/actions/buildingActions'
import Timer from '../../../core/components/Timer'
import ProgressBar from '../../../core/components/ProgressBar'


export class PopupStaticBuildingTitle extends Component {
    render () {
        const { sBuilding } = this.props;

        return (
            <span>
               { sBuilding.name }
            </span>
        )
    }
}

class PopupStaticBuilding extends Component {

    handleClick(base, sB) {
        this.props.actions.createBuilding(base, sB);
    }

    render() {
        const { sBuilding, base } = this.props;
        const { createBuilding } = this.props.actions;
        return (
            <div>
                <div>
                    {sBuilding.description}
                </div>
                <div>
                    <button onClick={this.handleClick.bind(this, base, sBuilding)}>Build</button>

                </div>
            </div>
        );
    }
}

function mapStateToProps({ popup, entities, currentBase }) {

    return { base: entities.bases[currentBase.id], sBuilding: popup.data};
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({ createBuilding }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(PopupStaticBuilding);