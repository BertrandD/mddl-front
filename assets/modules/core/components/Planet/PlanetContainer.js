import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import format from '../../../../utils/numberFormat'
import map from 'lodash/map'
import Planet from './Planet'
import './PlanetContainer.scss'


class PlanetContainer extends Component {

    render() {
        const { base, sItems } = this.props;

        let resourcesCount = 0;

        map(base.inventory.RESOURCE, (resource) => {
            resourcesCount += resource.count;
        });

        return (
            <div className="PlanetContainer">
                <Planet />

                <div className="PlanetInfo">
                    <h2>Inventaire :</h2>
                    <table className={resourcesCount >= base.maxVolumes.max_volume_items && "color-error" || "color-white"}>
                        <tbody>
                        {map(base.inventory.RESOURCE, (item, key) => (
                            <tr key={key}>
                                <td className="color-yellow">{sItems[key].name}</td>
                                <td>{format(Math.round(item.count))}</td>
                                <td>({format(base.production[item.templateId])}/h)</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <h3>Espace de stockage :</h3>
                    {format(Math.round(resourcesCount))} / {format(base.maxVolumes.max_volume_items)} ({(100*resourcesCount/(base.maxVolumes.max_volume_items+0.1)).toFixed(0)}%)
                </div>
            </div>
        );
    }
}

import { getPopulatedCurrentBase } from '../../../base/reducers/baseReducer'
import { getStaticBuildings, getStaticItems } from '../../../static/reducers/staticReducer'

function mapStateToProps(state) {
    return { base: getPopulatedCurrentBase(state), sBuildings: getStaticBuildings(state), sItems: getStaticItems(state)  };
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({ }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanetContainer);