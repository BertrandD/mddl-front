import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './BaseRight.scss'
import BaseBuildingsList from './BaseBuildingsList'
import { openPopup } from '../../core/actions/popupActions'
import * as PopupTypes from '../../core/components/Popup/PopupTypes'

class BaseRight extends Component {

    render() {

        const { base, sBuildings } = this.props;
        const { openPopup } = this.props.actions;

        if (!base) {
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
                            Buildingsqsd
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
                                       staticBuildings={sBuildings}
                                       onSelectBuilding={openPopup.bind(null, PopupTypes.BUILDING)}
                                       onSelectStaticBuilding={openPopup.bind(null, PopupTypes.STATIC_BUILDING)}/>
                </div>
            </div>
        )
    }
}

import { getPopulatedCurrentBase } from '../reducers/baseReducer'
import { getBuildingsForBase } from '../reducers/buildingReducer'
import { getStaticBuildings } from '../../static/reducers/staticReducer'
import { getcurrentPlayer } from '../../player/reducers/playerReducer'

function mapStateToProps(state) {
    return { sBuildings: getStaticBuildings(state), base: getPopulatedCurrentBase(state) };
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({ openPopup }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseRight);
