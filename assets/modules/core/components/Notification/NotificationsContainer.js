import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import map from 'lodash/map'
import Notification from './Notification'

class NotificationContainer extends Component {

    render() {
        const { notifications, actions } = this.props;

        return (
            <div>
                {map(notifications, (notif, index) => (
                    <Notification notif={notif} key={index} onClose={actions.closeNotif.bind(null, index)}> </Notification>
                ))}
            </div>
        );
    }
}

import { getNotifications } from 'reducers/notificationReducer'
import { closeNotif } from 'actions/appActions'

function mapStateToProps(state) {
    return {notifications: getNotifications(state)};
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({ closeNotif }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationContainer);

