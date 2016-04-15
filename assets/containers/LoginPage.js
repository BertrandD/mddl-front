import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Login from '../components/Login';
import * as actions from '../actions/login';

class LoginPage extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {

        return (

            <div className="container login-form">
                <div className="block text-center"><h1>MiddleWar V2</h1></div>
                <div className="block">
                    <div className="wrapper text-center m-t m-b">
                        <strong>{ this.props.version }</strong>
                    </div>
                    <div className="wrapper text-center m-t m-b">
                        <strong>Sign in to continue</strong>
                    </div>
                    <Login />
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

LoginPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

