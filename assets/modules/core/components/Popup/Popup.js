import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './Popup.scss'
import Draggable from 'react-draggable';
import { closePopup } from '../../actions/popupActions'
import * as PopupTypes from './PopupTypes'
import PopupEmptyCell from './PopupEmptyCell'
import PopupBuilding, { PopupBuildingTitle } from './PopupBuilding'

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

    getClassName() {
        let className = "Popup";
        const data = this.props.popup;

        if (this.state.display) {
            className += " PopupDisplay"
        }

        if (!data.type || data.type.length < 1) {
            className += " PopupHidden"
        } else {
            className += " PopupVisible"
        }

        return className;
    }

    getTitle() {
        switch (this.props.popup.type) {
            case PopupTypes.EMPTY_CELL:
                return "Empty cell";
            case PopupTypes.BUILDING:
                return (<PopupBuildingTitle popup={this.props.popup} entities={this.props.entities} />);
            default:
                return "Popup title";
        }
    }

    getBody() {
        switch (this.props.popup.type) {
            case PopupTypes.EMPTY_CELL:
                return <PopupEmptyCell />;
            case PopupTypes.BUILDING:
                return <PopupBuilding />;
            default:
                return "Popup title";
        }
    }

    render() {

        this.state.display = this.state.display || Boolean(this.props.popup.type && this.props.popup.type.length > 0);

        return (
            <Draggable handle=".PopupHead"
                       defaultPosition={{x: 50, y: 0}}>
                <div className="PopupContainer">
                    <div className={this.getClassName()}>
                        <div className="PopupHead">
                            <div className="PopupTitle">
                                {this.getTitle(this.props.popup)}
                            </div>
                            <div className="PopupClose" onClick={this.props.actions.closePopup}>X</div>
                        </div>
                        <div className="PopupBody">
                            {this.getBody()}
                        </div>
                    </div>
                </div>
            </Draggable>
        );
    }
}

function mapStateToProps({ popup, entities, currentBase }) {
    return { popup, entities, currentBase };
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({ closePopup }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Popup);