import React, { Component } from 'react';
import TopMenu from './TopMenu'
import BottomMenu from './BottomMenu'
import Popup from './core/components/Popup/Popup'
import './App.scss'

class App extends Component {

    render() {
        const { center, right } = this.props;
        return (
            <div className="App">
                <TopMenu />

                <div className="AppTopLeft">
                    <div className="AppTopLeftContent">
                        Hey !
                    </div>
                </div>

                <div className="AppTopRight">
                    <div className="AppTopRightContent">
                        Hey !
                    </div>
                </div>

                <div className="AppCenter">
                    {center}
                </div>

                <BottomMenu />
            </div>
        );
    }
}

export default App;
