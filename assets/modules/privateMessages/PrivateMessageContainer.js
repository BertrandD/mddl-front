import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import map from 'lodash/map'
import Date from '../core/components/Date'
import Text from '../core/components/Text'

class PrivateMessageContainer extends Component {

    constructor(props, context) {
        super(props, context);
    }

    displayPms(pms) {
        return (
            <table className="table">
                <tr>
                    <th><Text string="words.date"/></th><th><Text string="messages.author"/></th><th><Text string="messages.message"/></th>
                </tr>
                {map(pms, (pm) => (
                    <tr>
                        <td>
                            <Date timestamp={pm.date}/>
                        </td>
                        <td>
                            {pm.author.name}
                        </td>
                        <td>
                            {pm.message}
                        </td>

                    </tr>
                ))}
            </table>
        )
    }

    render() {

        const { pms, sent } = this.props;

        return (
            <div className="Block">
                <h1><Text string="messages.yours"/></h1>
                <Link to="/messenger/send"><Text string="messages.send"/></Link>
                <h3><Text string="messages.received"/></h3>
                {this.displayPms(pms)}
                <h3><Text string="messages.sent"/></h3>
                {this.displayPms(sent)}
            </div>
        );
    }
}

import { getReceivedPrivateMessages, getSentPrivateMessages } from 'reducers/privateMessageReducer'

function mapStateToProps(state) {
    return { pms: getReceivedPrivateMessages(state), sent: getSentPrivateMessages(state) };
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({  }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateMessageContainer);

