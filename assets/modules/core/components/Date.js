import React, { Component, PropTypes } from 'react';
import moment from 'moment'

class Date extends Component {

    render() {
        const { timestamp, className } = this.props;
        moment.locale('fr');
        const date = moment(timestamp).format('LTS');
        return (<span className={className}>{date}</span>);
    }
}

Date.propTypes = {
    className: PropTypes.string,
    timestamp: PropTypes.number.isRequired
};

export default Date;
