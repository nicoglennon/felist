import React from 'react'
import {Droppable} from 'react-beautiful-dnd'

const getListOptionStyle = (dragging, isDraggingOver) => ({
  // color: isDraggingOver ? 'red' : 'inherit',
  // backgroundColor: isDraggingOver ? 'yellow' : '',
  // height: dragging ? '70px' : '51px',
  height: '50px',
  // transition: 'height 200ms ease',
})

const ListOption = ({listName, listId, handleListChange, style, handleRemoveList, handleEditListButton, dragging}) => {
  let removeButton;
  let moreButton;
  if (style) {
    removeButton = <button className="removeListButton" onClick={()=> {
      handleRemoveList(listId)
    }}><span>✕</span></button>;
    moreButton = <button className="moreListButton" onClick={()=> {handleEditListButton(listId)}}><span>⋯</span></button>;
  }
  return (
    <Droppable droppableId={listId}>
      {(provided, snapshot) => (
        <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={getListOptionStyle(dragging, snapshot.isDraggingOver)}>
            <div className='listOptionLine'>
              {removeButton}
              {moreButton}
              <li className='listOption'
                style={style}
                onClick={() => handleListChange(listId)}>
                {listName}
              </li>
            </div>
            {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default ListOption

  