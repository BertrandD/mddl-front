import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import Base from './components/Base'
import format from 'utils/numberFormat'
import map from 'lodash/map'

class BaseStatContainer extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { base, sItems } = this.props;
        if (!base) {
            return (
                <div>
                    Loading base...
                </div>
            )
        }
        return (
            <div className="Block">
                <h2>Statisitiques de la base :</h2>
                <p>
                    <span className="color-yellow fa fa-shield"> </span> {format(base.baseStat.BASE_SHIELD)} / {format(base.baseStat.BASE_MAX_SHIELD)}
                </p>
                <p>
                    <span className="color-yellow fa fa-heart"> </span> {format(base.baseStat.BASE_HEALTH)} / {format(base.baseStat.BASE_MAX_HEALTH)}
                </p>

                <h3>
                    Inventaire :
                </h3>

                <ul>
                    {map(base.inventory, (item, id) => (
                        <li key={id}>
                            {sItems[item.templateId].name} ► {item.count}
                        </li>
                    ))}
                </ul>
            </div>
        );

    }
}

import { getPopulatedCurrentBase } from 'reducers/baseReducer'
import { getStaticItems } from 'reducers/staticReducer'

function mapStateToProps(state) {
    return { base: getPopulatedCurrentBase(state), sItems: getStaticItems(state) };
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({  }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseStatContainer);

