import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import map from 'lodash/map'
import './TopMenu.scss'

class TopMenu extends Component {

    render() {
        const { base, player, items } = this.props;

        //FIXME : don't do that, this is a hack
        if (!base) {
            return (
                <div className="TopMenu">&nbsp;</div>
            )
        }
        let resourcesCount = 0;

        map(base.inventory.items, (resource) => {
            resourcesCount += resource.count;
        });

        return (
            <div className="TopMenu">
                <div>
                    <Link to="/">
                        <i className="fa fa-home"/>
                        <span className="font-bold">Home</span>
                    </Link>
                    <Link to="/friends">
                        <i className="fa fa-people"/>
                        <span className="font-bold">Amis</span>
                    </Link>
                    <Link to="/messenger">
                        <i className="fa fa-people"/>
                        <span className="font-bold">Messagerie</span>
                    </Link>
                </div>
                <div className={resourcesCount >= base.inventory.maxVolume && "color-error"}>
                    {base && map(base.inventory.items, (item) => (
                        <span key={item.id}>
                        <span className="color-yellow">{items[item.templateId].name}:</span> {Math.round(item.count)} ({base.production[item.templateId]}/h) - &nbsp;
                       </span>
                    ))}
                <span>&nbsp;
                    Storage: {Math.round(resourcesCount)} / {base.inventory.maxVolume} ({(100*resourcesCount/(base.inventory.maxVolume+0.1)).toFixed(0)}%)
                </span>
                </div>
                <div>
                    <Link to="/base">
                        Active base : { base ? base.name : 'No base selected' }
                    </Link>
                    <a>
                        <i className="fa fa-user"/>
                        <span className="font-bold">{ player ? player.name : 'No player active' }</span>
                    </a>
                    <a>
                        <i className="fa fa-lock"/>
                        <span className="cursor-pointer" onClick={this.props.actions.logout.bind(null)}>Logout</span>
                    </a>
                    {/*{ version }*/}
                    {/*<span ng-repeat="language in app.availableLanguages">
                     <label class="cursor-pointer">
                     <input type="radio"
                     class="cursor-pointer"
                     ng-click="app.changeLanguage()"
                     ng-value="language"
                     ng-model="app.language">
                     {{:: language }}
                     </label>
                     </span>*/}
                </div>
            </div>
        );
    }
}

import { getcurrentPlayer } from './player/reducers/playerReducer'
import { getCurrentBase } from './base/reducers/baseReducer'
import { getStaticItems } from './static/reducers/staticReducer'
import { getUser } from './auth/reducers/userReducer'
import { logout } from './auth/actions/loginActions'

function mapStateToProps(state) {
    return {user: getUser(state), items: getStaticItems(state), player: getcurrentPlayer(state), base: getCurrentBase(state)};
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({ logout }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);

