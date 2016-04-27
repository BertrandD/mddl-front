import React, { Component, PropTypes } from 'react';
import './Popup.scss'
import Draggable from 'react-draggable';

class Popup extends Component {

    render() {
        return (
            <Draggable handle=".PopupHead"
                       defaultPosition={{x: 0, y: 0}}>
                <div className="Popup">
                    <div className="PopupHead">
                        <div className="PopupTitle">
                            Popup title
                        </div>
                        <div className="PopupClose">X</div>
                    </div>
                    <div className="PopupBody">
                        Hey from Popup !
                    </div>
                </div>
            </Draggable>
        );
    }
}

Popup.propTypes = {
};

export default Popup;
