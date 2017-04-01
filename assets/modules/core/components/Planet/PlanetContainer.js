import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Link from '../Link';
import Planet from './Planet'
import './PlanetContainer.scss'


class PlanetContainer extends Component {

    render() {
        const { base } = this.props;

        if (!base) {
            return (<div></div>)
        }

        return (
            <div className="PlanetContainer">

                <div className="NextContainer">
                    <div className="Next">
                        <div className="NextTitle">
                            Prochain bâtiment
                        </div>
                        <div className="NextContent">

                        </div>
                    </div>
                    <div className="Next">
                        <div className="NextTitle">
                        Prochaine recherche
                        </div>
                        <div className="NextContent">

                         </div>
                     </div>
                    <div className="Next">
                        <div className="NextTitle">
                            Prochain vaisseau
                        </div>
                        <div className="NextContent">

                        </div>
                    </div>
                </div>

                <Planet />

                <Link to="/base">
                    <button className="button--primary">
                        Entrer
                    </button>
                </Link>

                <div className="PlanetActions">
                    <button>
                        Scanner la planète
                    </button>
                    <button>
                        Scanner l'orbite
                    </button>
                    <Link to="/system">
                        <button>
                            Scanner le système
                        </button>
                    </Link>
                </div>

                <div className="PlanetActions">
                    <button>
                        Informations
                    </button>
                    <button>
                        Messages planétaires
                    </button>
                    <button>
                        ??
                    </button>
                </div>
            </div>
        );
    }
}

import { getPopulatedCurrentBase } from 'reducers/baseReducer'
import { getStaticBuildings, getStaticItems } from 'reducers/staticReducer'

function mapStateToProps(state) {
    return { base: getPopulatedCurrentBase(state), sBuildings: getStaticBuildings(state), sItems: getStaticItems(state)  };
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({ }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanetContainer);