import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Login from './components/Login';
import * as actions from './actions/loginActions';

class LoginContainer extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="app">
                <div className="auth">
                    <h1 className="auth__title">MiddleWar V2</h1>
                    <div className="auth__subtitle">
                        <strong>{ this.props.version }</strong>
                    </div>
                    <div className="auth__subtitle">
                        <strong>Sign in to continue</strong>
                    </div>
                    <div className="auth__error">
                        { this.props.user.message }
                    </div>

                    <Login onSubmit={this.props.actions.fetchLogin}/>
                </div>
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

