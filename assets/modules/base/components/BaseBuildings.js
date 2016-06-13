import React, { Component, PropTypes } from 'react';
import forEach from 'lodash/forEach'
import map from 'lodash/map'
import ProgressBar from '../../core/components/ProgressBar'

require('./Base.scss');

class Base extends Component {

    constructor(props, context) {
        super(props, context);
        this.state= {
            now: Date.now(),
            end: Date.now() + 2000
        }
    }

    render() {

        const { buildings, sItems } = this.props;

        const sBuildings = [];

        forEach(this.props.sBuildings, (sBuilding) => {
            if (!buildings.some(b => b.buildingId === sBuilding.id)) {
                sBuildings.push(sBuilding);
            }
        });

        return (
            <div>
                <h2>Vos bâtiments</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Niveau</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {buildings.map((building, index) => (
                        <tr key={index}>
                            <td className="color-yellow text-center font-weight-bold">
                                {building.name}
                            </td>
                            <td className="color-yellow text-center">
                                {building.currentLevel}
                                {building.endsAt > 0 && (
                                    <span>
                                        &nbsp;<i className="fa fa-arrow-right"> </i> {building.currentLevel + 1}
                                        <ProgressBar start={building.startedAt} end={building.endsAt} />
                                    </span>
                                ) ||(
                                    <span>
                                        &nbsp;(max: {building.maxLevel})
                                    </span>
                                )}
                            </td>
                            <td>
                                {building.description}
                                <div>
                                    Prérequis :&nbsp;
                                    <ul className="list-inline">
                                        {building.requirements[1] && map(building.requirements[1].resources, (resource, index) => (
                                            <li key={index}>
                                                {sItems[index].name} : {resource}
                                            </li>
                                        ))}
                                    </ul>&nbsp;
                                    <ul className="list-inline">
                                        {building.requirements[1] && map(building.requirements[1].buildings, (req, index) => (
                                            <li key={index}>
                                                {this.props.sBuildings[req.id].name} niveau {req.level}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </td>
                            <td>
                                <button onClick={this.props.onUpgradeBuilding.bind(null, building)}>
                                    Améliorer
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <h2>Bâtiments constructibles</h2>
                {sBuildings.length > 0 && (
                    <table>
                        <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {sBuildings.map((sBuilding, index) => (
                            <tr key={index}>
                                <td className="color-yellow text-center font-weight-bold">
                                    {sBuilding.name}
                                </td>
                                <td>
                                    <div className="margin-bottom-inner">
                                        {sBuilding.description}
                                    </div>
                                    <div>
                                        Prérequis :&nbsp;
                                        <ul className="list-inline">
                                            {sBuilding.requirements[1] && map(sBuilding.requirements[1].resources, (resource, index) => (
                                                <li key={index}>
                                                    {sItems[index].name} : {resource}
                                                </li>
                                            ))}
                                        </ul>&nbsp;
                                        <ul className="list-inline">
                                            {sBuilding.requirements[1] && map(sBuilding.requirements[1].buildings, (req, index) => (
                                                <li key={index}>
                                                    {this.props.sBuildings[req.id].name} niveau {req.level}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </td>
                                <td>
                                    <button onClick={this.props.onCreateBuilding.bind(null, sBuilding, null)}>
                                        Construire
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) || (
                    <span>Vous avez déjà construit tout les bâtiments !</span>
                )}

            </div>
        )
    }
}

Base.propTypes = {
    buildings: PropTypes.array.isRequired,
    sItems: PropTypes.object.isRequired,
    sBuildings: PropTypes.object.isRequired,
    onUpgradeBuilding: PropTypes.func.isRequired,
    onCreateBuilding: PropTypes.func.isRequired
};

export default Base;
