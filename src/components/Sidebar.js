import React from 'react'
import ListOptions from './ListOptions'

const Sidebar = ({listOptions, handleListChange, currentList, handleNewListButton, handleRemoveList, handleEditListButton, dragging}) => {
  return (
    <div className="sidebarContentsWrapper">
      <ListOptions
        listOptions={listOptions}
        handleListChange={handleListChange}
        currentList={currentList}
        handleNewListButton={handleNewListButton}
        handleRemoveList={handleRemoveList}
        handleEditListButton={handleEditListButton}
        dragging={dragging}
      />
    </div>
  )
}

export default Sidebar