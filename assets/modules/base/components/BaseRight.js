import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './BaseRight.scss'
import BaseBuildingsList from './BaseBuildingsList'
import { openPopup } from '../../core/actions/popupActions'
import * as PopupTypes from '../../core/components/Popup/PopupTypes'
import populateBase from '../utils/populateBase'

class BaseRight extends Component {

    render() {

        const { base, staticBuildings } = this.props;
        const { openPopup } = this.props.actions;

        if (!this.props.base) {
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
                    <BaseBuildingsList base={base}
                                       staticBuildings={staticBuildings}
                                       onSelectBuilding={openPopup.bind(null, PopupTypes.BUILDING)}
                                       onSelectStaticBuilding={openPopup.bind(null, PopupTypes.STATIC_BUILDING)}/>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ currentBase, currentPlayer, entities }) {
    return { currentPlayer, staticBuildings: entities.staticBuildings, base: populateBase(currentBase.id, entities) };
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({ openPopup }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseRight);
