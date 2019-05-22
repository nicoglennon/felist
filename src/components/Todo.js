import React from 'react'
import ContentEditable from 'react-contenteditable'
import {Draggable} from 'react-beautiful-dnd'

const getItemStyle = (isDragging, draggableStyle) => ({
  // change background colour if dragging
  borderRadius: '10px',
  backgroundColor: isDragging ? 'oldlace' : 'inherit',
  color: isDragging ? 'black' : '',
  // styles we need to apply on draggables
  ...draggableStyle
});

// single Todo Component
const Todo = ({todo, index, edit, remove}) => {
	// single todo
	return (
    <Draggable
      key={todo.id}
      draggableId={todo.id}
      index={index}>
      {(provided, snapshot) => (
        <div className="listItemWrapper" 
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          <span className="dragBtn">
            <span {...provided.dragHandleProps}>☰</span>
          </span>
            <ContentEditable
              className="todosInput"
              html={todo.value} // innerHTML of the editable div
              disabled={false}       // use true to disable edition
              onChange={(e) => {edit(todo.id, e.target.value)}}// handle innerHTML change
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.target.blur();
                }
              }}
              onBlur={(e) => {
                var value = e.target.innerHTML.replace(/(&nbsp;)/g, ' ');
                if(value.trim() === '') {
                  remove(todo.id);
                } else {
                  edit(todo.id, value.trim());
                }
              }}
            />
        </div>
      )}
    </Draggable>
	)
}

export default Todo