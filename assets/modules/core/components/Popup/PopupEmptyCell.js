import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closePopup } from '../../actions/popupActions'
import map from 'lodash/map'
import filter from 'lodash/filter'
import reduce from 'lodash/reduce'
import { createBuilding } from '../../../base/actions/buildingActions'

class PopupEmptyCell extends Component {

    getAvailableBuildings () {

        const base = this.props.entities.bases[this.props.currentBase.id];

        const buildingIds = reduce([...base.buildings], (result, id) => {
            result.push(this.props.entities.buildings[id].buildingId);
            return result;
        }, []);
        return filter(this.props.entities.staticBuildings, (staticBuilding) => {
            return !buildingIds.some((buildingId) => buildingId === staticBuilding.id)
        })
    }

    handleCreate (building) {
        this.props.actions.createBuilding(this.props.entities.bases[this.props.currentBase.id], building, this.props.popup.data.position);
        this.props.actions.closePopup();
    }

    render() {
        return (
            <div>
                This cell is empty, you can build what you want !

                <h4>Available buildings : </h4>

                <div className="list">
                    { map(this.getAvailableBuildings(), (building, index) => (
                        <div key={index} className="list__item">
                            <div className="list__item__image">
                                <img src="http://placehold.it/80x80" alt={building.name}/>
                            </div>
                            <div className="list__item__body">
                                <div className="list__item__title">
                                    {building.name}
                                </div>
                                <div className="list__item__description">
                                    {building.description}
                                </div>
                            </div>
                            <div className="list__item__actions">
                                <button onClick={this.handleCreate.bind(this, building)}>Build</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>        );
    }
}

function mapStateToProps({ popup, entities, currentBase }) {
    return { popup, entities, currentBase };
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({ createBuilding, closePopup }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(PopupEmptyCell);