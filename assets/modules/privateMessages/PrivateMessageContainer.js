import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Link from '../core/components/Link';
import map from 'lodash/map'
import Date from '../core/components/Date'
import Text from '../core/components/Text'
import './PrivateMessage.scss'

class PrivateMessageContainer extends Component {

    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        this.setState({
            pm: null
        })
    }

    select(pm) {
        this.setState({pm});
    }

    displayPms(pms) {
        return (
            <table className="pm-table">
                <thead>
                    <tr>
                        <th><Text string="words.date"/></th><th><Text string="messages.author"/></th><th><Text string="messages.title"/></th>
                    </tr>
                </thead>
                <tbody>
                {map(pms, (pm) => (
                    <tr key={pm.id} onClick={this.select.bind(this, pm)}>
                        <td>
                            <Date timestamp={pm.date}/>
                        </td>
                        <td>
                            {pm.author.name}
                        </td>
                        <td>
                            {pm.title}
                        </td>

                    </tr>
                ))}
                </tbody>
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
                <div className="pm-block">
                    <div className="pm-list">
                        {this.displayPms(pms)}
                    </div>
                    <div className="pm-detail">
                        {this.state.pm && (
                            <div>
                                <div>
                                    <span className="color-yellow text-bold"><Text string="messages.from" /> : </span> {this.state.pm.author.name}
                                </div>
                                <div>
                                    <span className="color-yellow text-bold"><Text string="messages.message"/> : </span>
                                </div>
                                <div className="pm-detail__message">
                                    {this.state.pm.message}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

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

