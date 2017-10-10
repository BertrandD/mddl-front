import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './BottomMenu.scss'

class BottomMenu extends Component {

    render() {
        return (
            <div className="BottomMenu">
                <div className="BottomMenuVersion">
                    Development build - {VERSION}
                </div>
                <div className="BottomMenuLastAction">
                    {this.props.action.map((a, k) => (
                        <div key={a+k}>
                            {a}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return { action: state.currentAction };
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({ }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomMenu);

