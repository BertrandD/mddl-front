import React, { Component, PropTypes } from 'react';
import Date from '../Date'
import './Notifications.scss'

class Notification extends Component {

    render() {
        const { notif } = this.props;

        return (
            <div className="Notification">
                <Date className="color-yellow" timestamp={notif.date} />&nbsp;{notif.message}
            </div>
        );
    }
}

Notification.propTypes = {
    notif: PropTypes.object.isRequired
};

export default Notification;
