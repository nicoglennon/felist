import React from 'react'
import {Droppable} from 'react-beautiful-dnd'

const getTrashContainerStyle = dragging => ({
    boxSizing: 'border-box',    
    textAlign: 'center',
    height: '70px',
    transition: 'height 300ms ease, opacity 300ms ease',
    margin: 'auto',
    marginBottom: '10px',
    opacity: dragging ? 1 : 0,
})

const getTrashStyle = (dragging, isDraggingOver) => ({
    borderRadius: '0px 0px 20px 20px',
    maxWidth: '900px',
    boxSizing: 'border-box',
    padding: '8px 70px',
    width: '100%',
    height: '100%',
    margin: 'auto',
    textAlign: 'center',
    transition: 'background-color 200ms ease',
    backgroundColor: isDraggingOver ? 'lightcoral' : 'lavenderblush',
    overflow: 'hidden',
  });

const TrashBucket = ({ dragging }) => {
    return (
        <div className="trashBucketWrapper" style={getTrashContainerStyle(dragging)}>
            <Droppable droppableId={'trash'}>
                {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    style={getTrashStyle(dragging, snapshot.isDraggingOver)}>
                    {provided.placeholder}
                    <p>🗑 Drop Here To Delete 🗑</p>
                </div>
                )}
            </Droppable>
        </div>
    )
  }

  export default TrashBucket