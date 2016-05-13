import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createBuilding } from '../../../base/actions/buildingActions'
import { closePopup } from '../../actions/popupActions'
import Timer from '../../../core/components/Timer'
import ProgressBar from '../../../core/components/ProgressBar'
import renderStaticBuildingsRequirements from '../../../static/utils/renderStaticBuildingsRequirements'

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

    constructor(props, ctx) {
        super(props, ctx);
        this.state = {
            error: ''
        }
    }

    handleClick(base, sB) {
        this.props.actions.createBuilding(base, sB).then(this.props.actions.closePopup).catch(res => {
            this.setState({error:res.meta.message});
        });
    }

    render() {
        const { sBuilding, base, items, buildings } = this.props;
        const { createBuilding } = this.props.actions;
        return (
            <div>
                <div>
                    {sBuilding.description}
                </div>
                <div>
                    {renderStaticBuildingsRequirements(sBuilding, 1, items, buildings)}
                </div>
                <div>
                    <button onClick={this.handleClick.bind(this, base, sBuilding)}>Build</button>
                    {this.state.error}
                </div>
            </div>
        );
    }
}

function mapStateToProps({ popup, entities, currentBase }) {

    return { items:entities.staticItems, buildings:entities.staticBuildings, base: entities.bases[currentBase.id], sBuilding: popup.data};
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({ createBuilding, closePopup }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(PopupStaticBuilding);