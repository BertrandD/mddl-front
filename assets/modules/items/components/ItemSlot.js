import React, { Component, PropTypes } from 'react';
import * as ItemTypes from 'types/ItemTypes';
import { DropTarget } from 'react-dnd';
import { canDropElement, getDroppedElement } from '../../core/DragCore'
import Item from './Item'

const itemTarget = {
    canDrop(props) {
        return getDroppedElement().type == props.target;
    },

    drop(props) {
        props.onDropModule(getDroppedElement());
    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    };
}

class ItemSlot extends Component {

    renderOverlay(color) {
        return (
            <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 1,
        opacity: 0.5,
        backgroundColor: color
      }} />
        );
    }

    render() {
        const { connectDropTarget, isOver, canDrop  } = this.props;

        return connectDropTarget(
            <div style={{
                position: 'relative',
                display: 'inline-block'
              }}>
                <Item/>
                {isOver && !canDrop && this.renderOverlay('red')}
                {!isOver && canDrop && this.renderOverlay('yellow')}
                {isOver && canDrop && this.renderOverlay('green')}
            </div>
        );
    }
}

ItemSlot.propTypes = {
    isOver: PropTypes.bool.isRequired
};

export default DropTarget(ItemTypes.ITEM, itemTarget, collect)(ItemSlot);