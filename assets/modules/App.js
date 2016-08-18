import React, { Component } from 'react';
import TopMenu from './TopMenu'
import BottomMenu from './BottomMenu'
import Popup from './core/components/Popup/Popup'
import NotificationContainer from './core/components/Notification/NotificationsContainer'
import './App.scss'

class App extends Component {

    render() {
        const { center, left, right } = this.props;
        return (
            <div className="AppContainer">
                <TopMenu />
                <div className="App">
                    <div className="AppLeftColumn">
                        {left}
                    </div>

                    <div className="AppCenter">
                        {center}
                    </div>

                    <div className="AppRightColumn">
                        {right}
                    </div>
                </div>
                <div className="AppNotifications">
                    <NotificationContainer>
                    </NotificationContainer>
                </div>
                <BottomMenu />
            </div>
        );
    }
}

export default App;
