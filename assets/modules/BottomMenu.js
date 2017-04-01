import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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

