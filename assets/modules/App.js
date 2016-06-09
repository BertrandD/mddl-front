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

                <div className="AppCenter">
                    <div className="AppPlanetCircles">&nbsp;</div>
                    <div className="AppPlanet">&nbsp;</div>
                    <div className="AppBlockRight">
                        <div className="AppBlockTitle">En cours sur la base 01:</div>
                        <div className="AppBlockContent">
                            <ul>
                                <li className="aside-layout margin-bottom-gutter">
                                    <div className="aside-layout__slave">
                                        <span className="CircleProgress">73%</span>
                                    </div>
                                    <div className="aside-layout__master">
                                        <ul>
                                            <li>Amélioration: Hangar</li>
                                            <li> > Niveau 4 </li>
                                            <li className="font-size-small text-italic">Terminé dans 44 min 19 sec</li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="aside-layout margin-bottom-gutter">
                                    <div className="aside-layout__slave">
                                        <span className="CircleProgress">73%</span>
                                    </div>
                                    <div className="aside-layout__master">
                                        <ul>
                                            <li>Amélioration: Hangar</li>
                                            <li> > Niveau 4 </li>
                                            <li className="font-size-small text-italic">Terminé dans 44 min 19 sec</li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="aside-layout margin-bottom-gutter">
                                    <div className="aside-layout__slave">
                                        <span className="CircleProgress">73%</span>
                                    </div>
                                    <div className="aside-layout__master">
                                        <ul>
                                            <li>Amélioration: Hangar</li>
                                            <li> > Niveau 4 </li>
                                            <li className="font-size-small text-italic">Terminé dans 44 min 19 sec</li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <BottomMenu />
            </div>
        );
    }
}

export default App;
