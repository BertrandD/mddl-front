import React, { Component, PropTypes } from 'react';

class ProgressBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            progress: (Date.now() - this.props.start) * 100 / (this.props.end - this.props.start)
        };
    }

    componentDidMount() {
        this.timer = setTimeout(this.tick.bind(this), 0);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    tick() {
        const progress = Math.min((Date.now()+1000 - this.props.start) * 100 / (this.props.end - this.props.start), 100);

        this.setState(Object.assign({}, this.state, {
            progress
        }));
        this.timer = setTimeout(this.tick.bind(this), 1000);
    }

    render() {
        return (
            <div className="progress">
                <div className="progress-text">
                    {Math.round(this.state.progress)}%
                </div>
                <div className="progress-bar" style={{transform: 'translateX(' + (-100 + this.state.progress) + '%)'}}>&nbsp;</div>
            </div>
        );
    }
}

ProgressBar.propTypes = {
    end: PropTypes.number.isRequired,
    start: PropTypes.number.isRequired
};

export default ProgressBar;
