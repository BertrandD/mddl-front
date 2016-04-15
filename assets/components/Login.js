import React, { Component, PropTypes } from 'react';

class Login extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            error: false
        };
    }

    handleSubmit(e) {
        e.preventDefault()

        const email = this.refs.email.value
        const password = this.refs.pass.value

        this.props.onSubmit({email, password});
    }

    render() {
        return (
            <form name="form" className="form-validation" onSubmit={this.handleSubmit.bind(this)}>
                <div className="list-group list-group-sm">
                    <div className="list-group-item">
                        <input type="text" ref="username" placeholder="Username"
                               className="form-control no-border" autofocus="true"
                               required/>
                    </div>
                    <div className="list-group-item">
                        <input type="password" ref="password" placeholder="Password"
                               className="form-control no-border" required/>
                    </div>
                </div>
                <button type="submit" className="btn btn-lg btn-success btn-block">
                    Log in
                </button>
                <button type="button" className="btn btn-lg btn-success btn-block">
                    Register
                </button>
            </form>
        )
    }
}

Login.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

export default Login;
