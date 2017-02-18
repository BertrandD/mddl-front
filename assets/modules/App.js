import React, { Component } from 'react';
import TopMenu from './TopMenu'
import TopCenter from './TopCenter'
import BottomMenu from './BottomMenu'
import Popup from './core/components/Popup/Popup'
import NotificationContainer from './core/components/Notification/NotificationsContainer'
import './App.scss'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

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
                        <TopCenter/>
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

export default DragDropContext(HTML5Backend)(App);
