import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppBackground from './AppBackground'

import "./Loading.scss"
import PlanetPattern from "./system/components/PlanetPattern";


class LoadingContainer extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="LoadingContainer">
                <AppBackground />
                <div className="Loading">
                    <div>
                        <div className="LoadingPlanet">
                            <svg width="75" height="75">
                                <g transform="translate(35,35)">
                                    <circle class="planet" fill="url(#planet)" r="60" cx="60" cy="60" transform=" scale(0.6) translate(-60,-60)"></circle>
                                </g>
                            </svg>
                        </div>

                        <div className="Block">
                            Loading
                        </div>
                    </div>
                </div>
                <PlanetPattern/>
            </div>
        );

    }
}

function mapStateToProps(state) {
    return { };
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({  }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadingContainer);

