import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import map from 'lodash/map'

class SystemContainer extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { players, actions } = this.props;

        return (
            <div className="Block">
                <div className="BlockTitle">
                    System
                </div>

                <h3>Players in system : </h3>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Player name</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {map(players, (player, playerId) => (
                        <tr key={playerId}>
                            <td>{player.name}</td>
                            <td className="text-center">
                                <button className="button--primary" onClick={actions.spyBase.bind(null, player.bases[0])}>
                                    Spy
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );

    }
}

import { getOtherPlayers } from 'reducers/playerReducer'

function mapStateToProps(state) {
    return { players: getOtherPlayers(state) };
}

import { spyBase } from 'actions/reportsActions.js'

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({ spyBase }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(SystemContainer);

