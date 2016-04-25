import React, { Component, PropTypes } from 'react';

class Timer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            left: this.props.end - Date.now()
        };
        this.timer = setTimeout(this.tick.bind(this), 1000);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    tick() {
        const seconds = this.props.end > Date.now() ? this.props.end - Date.now() : 0;

        this.setState(Object.assign({}, this.state, {
            left: seconds
        }));
        this.timer = setTimeout(this.tick.bind(this), 1000);
    }

    render() {

        const seconds = (this.state.left / 1000).toFixed(0);

        return (<span>{seconds}</span>);
    }
}

Timer.propTypes = {
    end: PropTypes.number.isRequired
};

export default Timer;
