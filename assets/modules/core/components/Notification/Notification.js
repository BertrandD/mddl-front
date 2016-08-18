import React, { Component, PropTypes } from 'react';
import Date from '../Date'
import './Notifications.scss'

class Notification extends Component {

    render() {
        const { notif, onClose } = this.props;

        return (
            <div className="Notification" onClick={onClose.bind(null)}>
                <Date className="color-yellow" timestamp={notif.date} />&nbsp;{notif.message}
            </div>
        );
    }
}

Notification.propTypes = {
    notif: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
};

export default Notification;
