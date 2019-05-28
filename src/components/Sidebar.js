import React from 'react'
import ListOptions from './ListOptions'

const Sidebar = ({data, handleListChange, currentListName, currentListId, handleNewListButton, handleRemoveList, handleEditListButton, dragging}) => {
  return (
    <div className="sidebarContentsWrapper">
      <ListOptions
        listOptions={data.lists}
        listOrder={data.listOrder}
        handleListChange={handleListChange}
        currentListName={currentListName}
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