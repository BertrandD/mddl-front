import React, { Component, PropTypes } from 'react';
import './tooltip.scss'

function Tooltip(props) {
    return (
        <div className="TooltipHolder">
            <div className="Tooltip">
                {props.text}
            </div>
            {props.children}
        </div>
    )
}

Tooltip.propTypes = {
    text: PropTypes.string.isRequired
};

export default Tooltip;