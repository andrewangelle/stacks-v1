import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd'

export default class Drag extends Component {
  static propTypes = {
    dragId: PropTypes.any.isRequired,
    index: PropTypes.number.isRequired
  }

  render() {
    const { dragId, index, children } = this.props;
    return (
      <Draggable draggableId={dragId} index={index}>
        {(provided, snapshot) => (
          <div>
            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
              {children}
            </div>
            {provided.placeholder}
          </div>
        )}
      </Draggable>
    )
  }
}