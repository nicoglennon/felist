import React from 'react'
import ListOptions from './ListOptions'

const Sidebar = ({data, handleListChange, currentList, currentListId, handleNewListButton, handleRemoveList, handleEditListButton, dragging}) => {
  return (
    <div className="sidebarContentsWrapper">
      <ListOptions
        listOptions={data.lists}
        handleListChange={handleListChange}
        currentList={currentList}
        currentListId={currentListId}
        handleNewListButton={handleNewListButton}
        handleRemoveList={handleRemoveList}
        handleEditListButton={handleEditListButton}
        dragging={dragging}
      />
    </div>
  )
}

export default Sidebar