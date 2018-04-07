import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd'

export default class Drop extends Component {
  render() {
    const { children, direction, classNameProp } = this.props
    return (
      <Droppable droppableId="droppable" direction={direction}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} className={classNameProp}>
            {children}
          </div>
        )}
      </Droppable>
    )
  }
}