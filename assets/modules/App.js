import React, { Component } from 'react';
import TopMenu from './TopMenu'
import TopCenter from './TopCenter'
import NotificationContainer from './core/components/Notification/NotificationsContainer'
import './App.scss'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import AppBackground from './AppBackground'
import BottomMenu from './BottomMenu'

class App extends Component {

    render() {
        const { center, left, right } = this.props;
        return (
            <div style={{height:'100%'}}>
                <AppBackground />
                <div className="AppContainer">
                    <TopMenu />
                    <TopCenter/>
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
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(App);
