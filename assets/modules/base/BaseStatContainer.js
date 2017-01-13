import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import Base from './components/Base'
import format from 'utils/numberFormat'
import map from 'lodash/map'

import DraggableModule from '../items/components/DraggableModule'

class BaseStatContainer extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { base, sItems, strings } = this.props;
        if (!base) {
            return (
                <div>
                    { strings.app.loading }
                </div>
            )
        }
        return (
            <div className="Block">
                <h2>{ strings.base.stats }</h2>
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

                <ul>
                    {map(base.inventory, (item, id) => (
                        <li key={id}>
                            <DraggableModule sItem={sItems[item.templateId]} item={item} /> ► {item.count}
                        </li>
                    ))}
                </ul>
            </div>
        );

    }
}

import { getPopulatedCurrentBase } from 'reducers/baseReducer'
import { getStaticItems } from 'reducers/staticReducer'
import { getStrings } from 'reducers/userReducer'

function mapStateToProps(state) {
    return { base: getPopulatedCurrentBase(state), sItems: getStaticItems(state), strings: getStrings(state) };
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({  }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseStatContainer);

