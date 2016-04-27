import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './Popup.scss'
import Draggable from 'react-draggable';
import { closePopup } from '../../actions/popupActions'

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

    render() {
        const data = this.props.popup;

        this.state.display = this.state.display || Boolean(data.type && data.type.length > 0);

        return (
            <Draggable handle=".PopupHead"
                       defaultPosition={{x: 0, y: 0}}>
                <div className="PopupContainer">
                    <div className={this.getClassName()}>
                        <div className="PopupHead">
                            <div className="PopupTitle">
                                Popup title
                            </div>
                            <div className="PopupClose" onClick={this.props.actions.closePopup}>X</div>
                        </div>
                        <div className="PopupBody">
                            Hey from Popup ! {this.props.popup.type}
                        </div>
                    </div>
                </div>
            </Draggable>
        );
    }
}

function mapStateToProps({ popup }) {
    return { popup };
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({ closePopup }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Popup);