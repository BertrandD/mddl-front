import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import map from 'lodash/map'
import Notification from './Notification'

class NotificationContainer extends Component {

    render() {
        const { notifications } = this.props;

        return (
            <div>
                hello !
                {map(notifications, (notif, index) => (
                    <Notification notif={notif} key={index}> </Notification>
                ))}
            </div>
        );
    }
}

import { getNotifications } from '../../reducers/notificationReducer'

function mapStateToProps(state) {
    return {notifications: getNotifications(state)};
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({ }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationContainer);

