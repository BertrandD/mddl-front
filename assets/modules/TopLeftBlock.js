import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Date from './core/components/Date'

class TopLeftBlock extends Component {

    render() {
        const { notifications } = this.props;

        return (
            <div>
                <ul>
                    {notifications.map((notif, index) => (
                        <li key={index}>
                            <Date className="color-yellow" timestamp={notif.date} /> {notif.message}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

import { getNotifications } from './core/reducers/notificationReducer'

function mapStateToProps(state) {
    return {notifications: getNotifications(state)};
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({ }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(TopLeftBlock);

