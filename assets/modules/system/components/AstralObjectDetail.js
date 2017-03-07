import React, { Component } from 'react';
import { connect } from 'react-redux';
import map from 'lodash/map'
import { duration } from 'moment'
import { bindActionCreators } from 'redux';

class SystemContainer extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { base, obj, actions } = this.props;

        return (
            <div className="Block SystemDetails">
                <div className="color-yellow font-weight-bold">{obj.name}</div>
                <div>Orbit: {obj.orbit}</div>
                <div>Revolution: {duration(obj.revolution, 'minutes').humanize()}</div>

                <div>
                    Bases :
                </div>
                <ul>
                    {obj.id == base.planet && (
                        <li className="color-yellow">
                            {base.name} ({base.owner.name})
                        </li>
                    )}
                    {map(obj.bases, (b) => b.id != base.id && (
                        <li key={b.id}>
                            {b.name} ({b.owner.name})
                            <Tooltip text={"Spy"}>
                                &nbsp;<i className="fa fa-user-secret cursor-pointer" onClick={actions.spyBase.bind(null, b.id)}/>
                            </Tooltip>
                        </li>
                    ))}
                </ul>


                <div>
                    Moons :
                </div>
                <ul>
                    {map(obj.satellites, (moon) => (
                        <li key={moon.name}>
                            {moon.name}
                        </li>
                    ))}
                </ul>

                {obj.type === 'Planet' && (
                    <div>
                        <button className="button--primary" onClick={actions.scanAstralObject.bind(null, obj)}>
                            Scan
                        </button>
                        {obj.lastScan && (
                            <div>
                                (Last scan : <Date timestamp={obj.lastScan}/>)
                            </div>
                        )}
                    </div>
                )}
            </div>
        );

    }
}

import { getCurrentBase } from 'reducers/baseReducer'
import { getPopulatedAstralObject } from 'reducers/spaceReducer'

function mapStateToProps(state, ownProps) {
    const base = getCurrentBase(state);
    const obj = getPopulatedAstralObject(state, ownProps.id);
    return { obj, base };
}

import { spyBase } from 'actions/reportsActions.js'
import { scanAstralObject } from 'actions/spaceActions.js'

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({ scanAstralObject, spyBase }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(SystemContainer);

