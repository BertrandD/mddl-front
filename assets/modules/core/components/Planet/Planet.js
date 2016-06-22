import React, { Component } from 'react';
import './Planet.scss'

class Planet extends Component {

    render() {
        return (
            <div>
                <div className="PlanetCircles PlanetCircle1"></div>
                <div className="PlanetCircles PlanetCircle2"></div>
                <div className="PlanetCircles PlanetCircle3"></div>
                <div className="PlanetCircles PlanetCircle4"></div>
                <div className="PlanetCircles PlanetCircle5"></div>
                <div className="PlanetCircles PlanetCircle6"></div>
                <div className="PlanetCircles PlanetCircle7"></div>
                <div className="Planet">&nbsp;</div>
                <div className="PlanetBlockRight">
                    <div className="PlanetBlockTitle">En cours sur la base 01:</div>
                    <div className="PlanetBlockContent">
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

                <div className="PlanetBlockLeft">
                    <div className="PlanetBlockTitle">Ressources base 01</div>
                    <div className="PlanetBlockContent">
                        <ul>
                            <li className="margin-bottom-gutter">
                                Fer: 10 000 / 15 000
                            </li>
                            <li className="margin-bottom-gutter">
                                Fer: 10 000 / 15 000
                            </li>
                            <li className="margin-bottom-gutter">
                                Fer: 10 000 / 15 000
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

Planet.propTypes = {
};

export default Planet;