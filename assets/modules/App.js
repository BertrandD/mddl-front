import React, { Component } from 'react';
import { Link } from 'react-router';

class App extends Component {

    render() {
        const { center, right } = this.props;
        return (
            <div>
                <div className="top-menu">
                    <div>
                        <Link to="/home">
                            <i className="fa fa-home"/>
                            <span className="font-bold">Home</span>
                        </Link>
                    </div>
                    <div>
                        {/*
                         <span>
                         <span ng-repeat="(name, amount) in ctrl.selectedBasement.resources">
                         {{ name | translate }}: {{ amount }}
                         </span>
                         </span>
                         */}
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
                <div className="app">
                    <div className="app-left"/>
                    <div className="app-center">
                        {/*        <div class="popup" mw-draggable ng-if="app.openPopup">
                         <div class="popup__title-bar">
                         <div class="popup__title">
                         Popup 1
                         </div>
                         <div class="popup__actions">
                         <span class="fa fa-close" ng-click="app.openPopup = false"></span>
                         </div>
                         </div>
                         <div class="popup__content" ng-mousedown="$event.stopPropagation()">
                         Popup content 1
                         </div>
                         </div>*/}
                        { center }
                    </div>
                    <div className="app-right">
                        { right }
                    </div>
                </div>
                <div className="notification-block">
                    {/*    <div class="notification-block__item" ng-repeat="notif in ctrl.notifications">
                     {{ notif.content }}
                     </div>*/}
                </div>
                <div className="bottom-menu">
                    <div className="bottom-menu__container">
                        <div className="bottom-menu__item">
                            Menu 1
                        </div>
                        <div className="bottom-menu__item">
                            Menu 2
                        </div>
                        <div className="bottom-menu__item">
                            Menu 3
                        </div>
                        <div className="bottom-menu__item">
                            Menu 4
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
