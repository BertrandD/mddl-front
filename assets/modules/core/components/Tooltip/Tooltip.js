import React, { Component, PropTypes } from 'react';
import './tooltip.scss'

function Tooltip(props) {
    return (
        <span className="TooltipHolder">
            <div className="Tooltip">
                {props.text}
            </div>
            {props.children}
        </span>
    )
}

Tooltip.propTypes = {
    text: PropTypes.string.isRequired
};

export default Tooltip;