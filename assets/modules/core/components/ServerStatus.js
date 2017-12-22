import React, { Component } from 'react';

class ServerStatus extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            status: "checking..."
        }
    }

    componentWillMount() {
        window.checkStatus().then(res => {
            this.setState({
                status: res
            })
        });
    }

    render() {
        const className = this.state.status === "online" ? "color-yellow" : "color-error";
        return (<div>Server status: <span className={className}>{this.state.status}</span></div>);
    }
}

export default ServerStatus;
