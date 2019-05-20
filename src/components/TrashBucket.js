import React from 'react'
import {Droppable} from 'react-beautiful-dnd'

const getTrashContainerStyle = dragged => ({
    boxSizing: 'border-box',    
    textAlign: 'center',
    height: '72px',
    margin: 'auto',
    marginBottom: '10px',
    visibility: dragged ? 'unset' : 'hidden',
})

const getTrashStyle = (dragged, isDraggingOver) => ({
    borderRadius: '0px 0px 20px 20px',
    maxWidth: '900px',
    boxSizing: 'border-box',
    padding: '10px 35px',
    width: '100%',
    height: '100%',
    margin: 'auto',
    textAlign: 'center',
    transition: 'background-color 200ms ease',
    backgroundColor: isDraggingOver ? 'lightcoral' : 'lavenderblush',
    overflow: 'hidden',
  });

const TrashBucket = ({ dragged }) => {
    return (
        <div className="trashBucketWrapper" style={getTrashContainerStyle(dragged)}>
            <Droppable droppableId={'trash'}>
                {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    style={getTrashStyle(dragged, snapshot.isDraggingOver)}>
                    {provided.placeholder}
                    <p>🗑 Delete</p>
                </div>
                )}
            </Droppable>
        </div>
    )
  }

  export default TrashBucket