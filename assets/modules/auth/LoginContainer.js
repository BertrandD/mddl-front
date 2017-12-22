import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Login from './components/Login';
import * as actions from 'actions/loginActions';
import AppBackground from '../AppBackground'
import PlanetPattern from "../system/components/PlanetPattern";
import NotificationContainer from '../core/components/Notification/NotificationsContainer'
import "./login.scss"
import ServerStatus from "../core/components/ServerStatus";

class LoginContainer extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="LoginContainer">
                <AppBackground />
                <div className="Login">
                    <div>
                        <div className="LoginPlanet">
                            <svg width="75" height="75">
                                <g transform="translate(35,35)">
                                    <circle class="planet" fill="url(#planet)" r="60" cx="60" cy="60" transform=" scale(0.6) translate(-60,-60)"></circle>
                                </g>
                            </svg>
                        </div>

                        <div className="Block auth">
                            <h1 className="auth__title">MiddleWar</h1>
                            <ServerStatus/>
                            <div className="auth__subtitle">
                                <strong>{ this.props.version }</strong>
                            </div>
                            <div className="auth__subtitle">
                                <strong>Sign in to continue</strong>
                            </div>

                            <Login onRegister={this.props.actions.register} onSubmit={this.props.actions.fetchLogin}/>
                        </div>
                    </div>
                </div>
                <div className="AppNotifications">
                    <NotificationContainer>
                    </NotificationContainer>
                </div>
                <PlanetPattern/>
            </div>
        );
    }
}

function mapStateToProps({ user, version }) {
    return {user, version};
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actions, dispatch)}
}

LoginContainer.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);

