import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchAuthentication } from './auth/actions/loginActions';
import { fetchBase } from './base/actions/baseActions';
import { fetchPlayer } from './player/actions/playerActions';
import { Link } from 'react-router';

class TopMenu extends Component {

    constructor(props) {
        super(props);
        this.props.actions.fetchAuthentication()
            .then(() => {
                this.props.actions.fetchPlayer()
            });
        //this.props.actions.fetchBase(this.props.user);
    }

    render() {
        return (
            <div className="top-menu">
                <div>
                    <Link to="/home">
                        <i className="fa fa-home"/>
                        <span className="font-bold">Home</span>
                    </Link>
                </div>
                <div>
                     <Link to="/base">
                         Active base : { this.props.base.name ? this.props.base.name : 'Coming soon' }
                     </Link>
                    <a>
                        <i className="fa fa-user"/>
                        <span className="font-bold">My profile</span>
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

function mapStateToProps({ user, base }) {
    return {user, base};
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({ fetchAuthentication, fetchBase, fetchPlayer }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);

