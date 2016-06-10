import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchAuthentication } from './auth/actions/loginActions';
import { fetchMyBases } from './base/actions/baseActions';
import { fetchPlayer } from './player/actions/playerActions';
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

        map(base.inventory.RESOURCE, (resource) => {
            resourcesCount += resource.count;
        });

        return (
            <div>
                <div className="TopMenu">
                    <div>
                        <Link to="/home">
                            <i className="fa fa-home"/>
                            <span className="font-bold">Home</span>
                        </Link>
                    </div>
                    <div className={resourcesCount >= base.maxVolumes.max_volume_resources && "color-error"}>
                        {base && map(base.inventory.RESOURCE, (resource, index) => (
                            <span key={index}>
                           {items[resource.templateId].name}: {Math.round(resource.count)}
                       </span>
                        ))}
                    <span>&nbsp;
                        Storage: {Math.round(resourcesCount)} / {base.maxVolumes.max_volume_resources} ({(100*resourcesCount/(base.maxVolumes.max_volume_resources+0.1)).toFixed(0)}%)
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
                            <span>Logout</span>
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

                <div className="AppTopCenter">
                    <div className="AppTopCenterContent">
                        Hey !
                    </div>
                </div>

            </div>
        );
    }
}

import { getcurrentPlayer } from './player/reducers/playerReducer'
import { getCurrentBase } from './base/reducers/baseReducer'
import { getStaticItems } from './static/reducers/staticReducer'
import { getUser } from './auth/reducers/userReducer'

function mapStateToProps(state) {
    return {user: getUser(state), items: getStaticItems(state), player: getcurrentPlayer(state), base: getCurrentBase(state)};
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({ }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);

