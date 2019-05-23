import React from 'react'
import ListOptions from './ListOptions'

const Sidebar = ({data, handleListChange, currentListId, handleNewListButton, handleRemoveList, handleEditListButton, dragging}) => {
  return (
    <div className="sidebarContentsWrapper">
      <ListOptions
        listOptions={data.lists}
        listOrder={data.listOrder}
        handleListChange={handleListChange}
        currentList={data.lists[currentListId].name}
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