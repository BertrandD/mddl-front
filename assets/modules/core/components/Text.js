import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Text extends Component {

    constructor(props, context) {
        super(props, context);
    }

    getTranslation(key) {
        console.log(key);
        const words = key.split('.');
        let trans = this.props.strings;
        words.forEach((t) => {
            trans = trans[t]
        });
        if (!trans) {
            return "%"+key+"%";
        }
        return trans
    }

    render() {
        const { string } = this.props;

        return (
            <span>
                {this.getTranslation(string)}
            </span>
        );
    }
}

import { getStrings } from 'reducers/userReducer'

function mapStateToProps(state) {
    return { strings: getStrings(state) };
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({  }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Text);

