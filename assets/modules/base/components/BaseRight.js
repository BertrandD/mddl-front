import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './BaseRight.scss'
import BaseBuildingsList from './BaseBuildingsList'
import { openPopup } from '../../core/actions/popupActions'
import * as PopupTypes from '../../core/components/Popup/PopupTypes'

class BaseRight extends Component {

    handleSelectBuilding (sBuilding) {
        this.props.actions.openPopup(PopupTypes.STATIC_BUILDING, sBuilding);
    }

    render() {

        const currentBase = this.props.entities.bases[this.props.currentBase.id];
        if (!currentBase) {
            return (
                <div>
                    Loading base...
                </div>
            )
        }

        return (
            <div className="BaseRight">
                <div className="BaseRightHeader">
                    <div>
                        <span className="active">
                            Buildings
                        </span>
                    </div>
                    <div>
                        <span disabled>
                            Units
                        </span>
                    </div>
                </div>
                <div className="BaseRightBody">
                    <BaseBuildingsList baseBuildings={this.props.entities.bases[this.props.currentBase.id].buildings}
                                       buildings={this.props.entities.buildings}
                                       staticBuildings={this.props.entities.staticBuildings}
                                       onSelectBuilding={this.handleSelectBuilding.bind(this)}/>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ currentBase, currentPlayer, entities }) {
    return { currentBase, currentPlayer, entities };
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({ openPopup }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseRight);
