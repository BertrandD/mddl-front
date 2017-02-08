import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import map from 'lodash/map'
import Date from '../core/components/Date'

class SystemContainer extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { base, star, actions } = this.props;
        return (
            <div className="Block">
                <div className="BlockTitle">
                    System
                </div>

                <h3>Star :</h3>
                {star.name}

                <h3>Planets : </h3>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Planet name</th>
                        <th>Bases</th>
                        <th>Moons</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {map(star.satellites, (planet) => (
                        <tr key={planet.id}>
                            <td>{planet.name}</td>
                            <td>
                                <ul>
                                    {planet.id == base.planet && (
                                        <li className="color-yellow">
                                            {base.name} ({base.owner.name})
                                        </li>
                                    )}
                                    {map(planet.bases, (b) => b.id != base.id && (
                                        <li>
                                            {b.name} ({b.owner.name})
                                            <button className="button--primary" onClick={actions.spyBase.bind(null, b.id)}>
                                                Spy
                                            </button>

                                        </li>
                                    ))}
                                </ul>
                            </td>
                            <td>
                                <ul>
                                    {map(planet.satellites, (moon) => (
                                        <li>
                                            {moon.name}
                                        </li>
                                    ))}
                                </ul>
                            </td>
                            <td className="text-center">
                                <button className="button--primary" onClick={actions.scanAstralObject.bind(null, planet)}>
                                Scan
                                </button>
                                {planet.lastScan && (
                                    <div>
                                        (Last scan : <Date timestamp={planet.lastScan}/>)
                                    </div>
                                )}

                                {/*<button className="button--primary" onClick={actions.spyBase.bind(null, player.bases[0])}>*/}
                                    {/*Spy*/}
                                {/*</button>*/}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>


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

