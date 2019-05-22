import React from 'react'
import {Droppable} from 'react-beautiful-dnd'

const getListOptionStyle = (dragging, isDraggingOver) => ({
  // color: isDraggingOver ? 'red' : 'inherit',
  // backgroundColor: isDraggingOver ? 'yellow' : '',
  // height: dragging ? '70px' : '51px',
  height: '50px',
  // transition: 'height 200ms ease',
})

const ListOption = ({listName, handleListChange, style, handleRemoveList, handleEditListButton, dragging}) => {
  let removeButton;
  let moreButton;
  if (style) {
    removeButton = <button className="removeListButton" onClick={()=> {
      handleRemoveList(listName)
    }}><span>✕</span></button>;
    moreButton = <button className="moreListButton" onClick={()=> {handleEditListButton(listName)}}><span>⋯</span></button>;
  }
  return (
    <Droppable droppableId={listName}>
      {(provided, snapshot) => (
        <div
            ref={provided.innerRef}
            style={getListOptionStyle(dragging, snapshot.isDraggingOver)}>
            <div className='listOptionLine'>
              {removeButton}
              {moreButton}
              <li className='listOption'
                style={style}
                onClick={handleListChange}>
                {listName}
              </li>
            </div>
        </div>
      )}
    </Droppable>
  )
}

export default ListOption

  