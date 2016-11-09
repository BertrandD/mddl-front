import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './Popup.scss'
import Draggable from 'react-draggable';
import { closePopup } from 'actions/popupActions'
import * as PopupTypes from './PopupTypes'

class Popup extends Component {

    constructor(props, ctx) {
        super(props, ctx);

        this.state = {
            display: false
        };

        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown)
    }

    handleKeyDown(e) {
        if (e.keyCode === 27) {
            this.props.actions.closePopup();
        }
    }

    render() {

        this.state.display = this.state.display || Boolean(this.props.popup.type && this.props.popup.type.length > 0);

        return (
            <Draggable handle=".PopupHead"
                       defaultPosition={{x: 50, y: 0}}>
                <div className="PopupContainer">
                    <div>
                        <div className="PopupHead">
                            <div className="PopupTitle">
                            </div>
                            <div className="PopupClose" onClick={this.props.actions.closePopup}>X</div>
                        </div>
                        <div className="PopupBody">
                        </div>
                    </div>
                </div>
            </Draggable>
        );
    }
}

function mapStateToProps({ popup, entities, currentBase }) {
    return { popup, entities, staticBuildings: entities.staticBuildings, currentBase };
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({ closePopup }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Popup);