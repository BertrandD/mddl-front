import React, { Component, PropTypes } from 'react';
import Planet from '../../core/components/Planet/Planet'
import map from 'lodash/map'
import { Link } from 'react-router';

require('./Base.scss');

class Base extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {

        const { base } = this.props;

        return (
            <div className="Base">
                <div className="BaseName">
                    {base.name}
                </div>

                <h2>Statisitiques de la base :</h2>
                <p>
                    <span className="color-yellow fa fa-shield"> </span> {base.baseStat.currentShield} / {base.baseStat.maxShield}
                </p>
                <p>
                    <span className="color-yellow fa fa-heart"> </span> {base.baseStat.currentHealth} / {base.baseStat.maxHealth}
                </p>
                <Link to="/base/buildings">
                    <h3>Voir les bâtiments</h3>
                </Link>

            </div>
        )
    }
}

Base.propTypes = {
    base: PropTypes.object.isRequired
};

export default Base;
