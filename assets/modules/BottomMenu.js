import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchAuthentication } from 'actions/loginActions';
import { fetchMyBases } from 'actions/baseActions';
import { fetchPlayer } from 'actions/playerActions';
import { Link } from 'react-router';
import map from 'lodash/map'
import './BottomMenu.scss'

class BottomMenu extends Component {

    render() {
        return (
            <div className="BottomMenu">
                <div className="BottomMenuBlockRight">
                    Hey !
                </div>
            </div>
        );
    }
}
function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({ }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomMenu);

