import React, { Component, PropTypes } from 'react';
import './Link.scss'

class Link extends Component {

    handleClick(to) {
        if (!to) return;
        if (this.props.onClick) this.props.onClick(event);
        this.context.router.push(to);
    }

    render() {
        const { to } = this.props;

        return (
            <span className="Link" onClick={this.handleClick.bind(this, to)}>
                {this.props.children}
            </span>
        );
    }
}

Link.propTypes = {
    to: PropTypes.string
};

Link.contextTypes = {
    router: PropTypes.object
};

export default Link;
