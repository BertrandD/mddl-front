import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import System from './components/System'
import AstralObjectDetail from './components/AstralObjectDetail'

class SystemContainer extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    handleOverObject(id) {
        this.setState({
            selected: id
        });
        console.log(id);
    }

    render() {
        const { base, star, actions } = this.props;
        const { selected } = this.state;
        return (
            <div className="SystemContainer">
                <System onOverObject={this.handleOverObject.bind(this)} star={star}/>

                {selected && (
                    <AstralObjectDetail id={selected}/>
                )}
            </div>
        );

    }
}

import { getCurrentBase } from 'reducers/baseReducer'
import { getAstralObject, getPopulatedAstralObject } from 'reducers/spaceReducer'

function mapStateToProps(state) {
    const base = getCurrentBase(state);
    const planet = getAstralObject(state, base.planet);
    const star = getPopulatedAstralObject(state, planet.parent.id);
    return { base, star };
}

import { spyBase } from 'actions/reportsActions.js'
import { scanAstralObject } from 'actions/spaceActions.js'

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({ scanAstralObject, spyBase }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(SystemContainer);

