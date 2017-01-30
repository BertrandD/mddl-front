import React, { Component, PropTypes } from 'react';
import * as ItemTypes from 'types/ItemTypes';
import { DragSource } from 'react-dnd';
import { beginDrag } from '../../core/DragCore'
import Item from './Item'

const moduleSource = {
    beginDrag(props) {
        beginDrag(props.item);
        return {};
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

class DraggableItem extends Component {
    render() {
        const { connectDragSource, isDragging, item } = this.props;
        return connectDragSource(
            <span style={{
                display: 'inline-block',
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move'
            }} >
                <Item item={item} />
            </span>
        );
    }
}

DraggableItem.propTypes = {
    connectDragSource: PropTypes.func,
    isDragging: PropTypes.bool,
    item: PropTypes.object.isRequired
};

export default DragSource(ItemTypes.ITEM, moduleSource, collect)(DraggableItem);