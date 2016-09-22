import React, { Component, PropTypes } from 'react';
import * as ItemTypes from 'types/ItemTypes';
import { DragSource } from 'react-dnd';
import { beginDrag } from '../../core/DragCore'

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

class DraggableModule extends Component {
    render() {
        const { connectDragSource, isDragging, sItem } = this.props;
        return connectDragSource(
            <sapn style={{
                    opacity: isDragging ? 0.5 : 1,
                    cursor: 'move'
                  }}>
                {sItem.name}
            </sapn>
        );
    }
}

DraggableModule.propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
};

export default DragSource(ItemTypes.MODULE, moduleSource, collect)(DraggableModule);