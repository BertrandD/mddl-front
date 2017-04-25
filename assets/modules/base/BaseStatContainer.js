import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Inventory from '../inventory/components/Inventory'
import format from 'utils/numberFormat'
import map from 'lodash/map'
import * as ItemTypes from '../../../core/types/ItemTypes'
import Link from "../core/components/Link";

class BaseStatContainer extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { base, sItems, player, strings } = this.props;
        if (!base) {
            return (
                <div>
                    { strings.app.loading }
                </div>
            )
        }
        return (
            <div className="Block">
                <h2>Player : { player.name }</h2>

                <p>
                    <Link to="/messenger">
                        Messages : 0 unread
                    </Link>
                </p>
                <p>
                    <Link to="/friends">
                        Friends : 0 online of {player.friends.length}
                    </Link>
                </p>

                <h2>{ strings.base.stats }</h2>
                <p>
                    Planet: {base.planet.name}
                </p>
                <p>
                    <span className="color-yellow fa fa-shield"> </span> {format(base.baseStat.BASE_SHIELD)} / {format(base.baseStat.BASE_MAX_SHIELD)}
                </p>
                <p>
                    <span className="color-yellow fa fa-heart"> </span> {format(base.baseStat.BASE_HEALTH)} / {format(base.baseStat.BASE_MAX_HEALTH)}
                </p>
                <p>
                    <span className="color-yellow fa fa-bolt"> </span> {format(base.baseStat.ENERGY)}
                </p>

                <h3>
                    { strings.base.inventory } :
                </h3>


                <Inventory defaultPane={ItemTypes.MODULE}/>

                <h3>
                    { strings.base.fleet } :
                </h3>
                <ul>
                    {map(base.ships, (ship, id) => (
                        <li key={id}>
                            {sItems[ship.structureId].name} ► {ship.count}
                        </li>
                    ))}
                </ul>

            </div>
        );

    }
}

import { getcurrentPlayer } from 'reducers/playerReducer'
import { getPopulatedCurrentBase } from 'reducers/baseReducer'
import { getStaticItems } from 'reducers/staticReducer'
import { getStrings } from 'reducers/userReducer'

function mapStateToProps(state) {
    return { base: getPopulatedCurrentBase(state), sItems: getStaticItems(state), strings: getStrings(state), player: getcurrentPlayer(state) };
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({  }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseStatContainer);

