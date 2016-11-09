import React, { Component, PropTypes } from 'react';

class Login extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            error: false
        };
    }

    handleSubmit(e) {
        e.preventDefault();

        const username = this.refs.username.value;
        const password = this.refs.password.value;

        this.props.onSubmit({username, password});
    }

    handleRegister(e) {
        e.preventDefault();

        const username = this.refs.username.value;
        const password = this.refs.password.value;

        this.props.onRegister({username, password});
    }

    render() {
        return (
            <form name="form" onSubmit={this.handleSubmit.bind(this)}>
                <div className="auth__inputs">
                    <input type="text" ref="username" placeholder="Username" autofocus="true" required/>
                    <input type="password" ref="password" placeholder="Password" required/>
                </div>
                <button type="submit">
                    Log in
                </button>
                <button type="button" onClick={this.handleRegister.bind(this)}>
                    Register
                </button>
            </form>
        )
    }
}

Login.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onRegister: PropTypes.func.isRequired
};

export default Login;
