import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Link from './core/components/Link';
import map from 'lodash/map'
import './TopMenu.scss'

class TopMenu extends Component {

    handleChange (event) {
        this.props.actions.changeLanguage(event.target.value);
    }

    render() {
        const { base, player, items, user, strings } = this.props;

        //FIXME : don't do that, this is a hack
        if (!base) {
            return (
                <div className="TopMenu">&nbsp;</div>
            )
        }

        return (
            <div className="TopMenu">
                <div>
                    <Link to="/">
                        <i className="fa fa-home"/>&nbsp;
                        <span className="font-bold">{ strings.menu.home }</span>
                    </Link>
                    <Link to="/friends">
                        <i className="fa fa-users"/>&nbsp;
                        <span className="font-bold">{ strings.friends.word }</span>
                    </Link>
                    <Link to="/messenger">
                        <i className="fa fa-envelope"/>&nbsp;
                        <span className="font-bold">{ strings.messages.menu }</span>
                    </Link>

                    <Link to="/base">
                        <i className="fa fa-building"/>&nbsp;
                        <span className="font-bold">Buildings</span>
                    </Link>

                    <Link to="/system">
                        <i className="fa fa-globe"/>&nbsp;
                        <span className="font-bold">Galaxy</span>
                    </Link>

                    <Link to="/reports">
                        <i className="fa fa-book"/>&nbsp;
                        <span className="font-bold">Reports</span>
                    </Link>
                </div>
                <div>
                    <Link to="/base">
                        { strings.menu.active_base } { base ? base.name : 'No base selected' }
                    </Link>
                    <Link>
                        <i className="fa fa-user"/>
                        <span className="font-bold">{ player ? player.name : 'No player active' }</span>
                    </Link>
                    <Link>
                        <i className="fa fa-lock"/>
                        <span className="cursor-pointer" onClick={this.props.actions.logout.bind(null)}>{ strings.menu.logout }</span>
                    </Link>

                    <select onChange={this.handleChange.bind(this)} value={user.lang}>
                        <option value="EN">en</option>
                        <option value="FR">fr</option>
                    </select>

                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);

