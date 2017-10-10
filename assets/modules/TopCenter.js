import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import map from 'lodash/map'
import size from 'lodash/size'
import './TopMenu.scss'

class TopCenter extends Component {

    render() {
        const { base, items } = this.props;

        return (
            <div className={"TopCenter"}>
                    {base && map(base.inventory.items, (item) => item.type !== 'RESOURCE' && (
                        <span key={item.id}>
                        <span className="color-yellow">{items[item.templateId].name}:</span> {Math.round(item.count)} {/*({base.production[item.templateId]}/h) -*/} &nbsp;
                       </span>
                    ))}
                    {base && map(base.resources, (item, id) => (
                        <span key={id}>
                            <span className="color-yellow">{items[item.templateId].name}: </span>
                            <span className={Math.round(item.count) === item.availableCapacity &&"color-error"}>
                                {Math.round(item.count)} / {item.availableCapacity} ({item.prodPerHour}/h)
                            </span>&nbsp;♦&nbsp;
                        </span>
                    ))}
                    {!base && (<span>Base loading...</span>)}
                {base && size(base.inventory.items)===0 && size(base.resources) === 0 && (<span>Nothing in base inventory</span>)}
            </div>
        );
    }
}

import { getcurrentPlayer } from 'reducers/playerReducer'
import { getCurrentBase } from 'reducers/baseReducer'
import { getStaticItems } from 'reducers/staticReducer'
import { getUser, getStrings } from 'reducers/userReducer'

function mapStateToProps(state) {
    return {user: getUser(state), items: getStaticItems(state), player: getcurrentPlayer(state), base: getCurrentBase(state), strings: getStrings(state)};
}

import { logout } from 'actions/loginActions'
import { changeLanguage } from 'actions/appActions'

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({ logout, changeLanguage }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(TopCenter);

