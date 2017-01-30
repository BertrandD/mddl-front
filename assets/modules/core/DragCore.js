import some from 'lodash/some'

let draggedElement = {};

export function beginDrag(element) {
    draggedElement = element;
}

export function getDroppedElement() {
    return draggedElement;
}

export function canDropElement(authorisedIds) {
    return some(authorisedIds, (id) => id == draggedElement.itemId)
}