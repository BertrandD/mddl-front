import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchAuthentication } from './auth/actions/loginActions';
import { fetchMyBases } from './base/actions/baseActions';
import { fetchPlayer } from './player/actions/playerActions';
import { Link } from 'react-router';

class TopMenu extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { base, player, items } = this.props;

        return (
            <div className="top-menu">
                <div>
                    <Link to="/home">
                        <i className="fa fa-home"/>
                        <span className="font-bold">Home</span>
                    </Link>
                </div>
                <div>
                    {base && base.inventory.RESOURCE.map((resource, index) => (
                        <span key={index}>
                           {items[resource.templateId].name}: {resource.count}
                       </span>
                    ))}
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
        );
    }
}

function mapStateToProps({ user, entities, currentPlayer, currentBase }) {
    return {user, items: entities.staticItems, player: entities.players[currentPlayer.id], base: entities.bases[currentBase.id]};
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({ }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);

