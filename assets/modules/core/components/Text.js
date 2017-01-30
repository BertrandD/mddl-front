import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Text extends Component {

    constructor(props, context) {
        super(props, context);
    }

    getTranslation(key) {
        const words = key.split('.');
        let trans = this.props.strings;
        words.forEach((t) => {
            trans = trans[t]
        });
        if (!trans) {
            console.warn("Translation key "+key+" not found !");
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

Text.propTypes = {
    string: PropTypes.string.isRequired
};
import { getStrings } from 'reducers/userReducer'

function mapStateToProps(state) {
    return { strings: getStrings(state) };
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({  }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Text);

