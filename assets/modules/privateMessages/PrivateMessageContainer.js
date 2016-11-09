import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

class PrivateMessageContainer extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="Block">
                <h1>Vos messages</h1>
                <Link to="/messenger/send">Envoyer un message</Link>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {  };
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({  }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateMessageContainer);

