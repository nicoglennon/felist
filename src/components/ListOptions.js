import React from 'react'
import ListOption from './ListOption'
import NewListButton from './NewListButton'

const ListOptions = ({listOptions, listOrder, handleListChange, currentListName, currentListId, handleNewListButton, handleRemoveList, handleEditListButton, dragging}) => {
  const allListOptions = currentListName === null ? null : listOrder.map((listOptionId) => {
    let listOptionStyle;
    let removeList;
    let editList;
    if (listOptionId === currentListId) {

      // current list style highlight
      listOptionStyle = {
        backgroundColor: '#E8E8E8',
        color: 'black',
      }
      removeList = handleRemoveList;
      editList = handleEditListButton;
    }
    
    const option = listOptions[listOptionId]

    return (<ListOption
              listName={option.name}
              listId={option.id}
              key={option.id}
              handleListChange={handleListChange}
              style={listOptionStyle}
              handleRemoveList={removeList}
              handleEditListButton={editList}
              dragging={dragging}
            />)
    }
  )

  return (
    <div className="listOptionsWrapper">
      <ul className="listOptionsUl">
        {allListOptions}
        <NewListButton
          handleNewListButton={handleNewListButton}>
        </NewListButton>
      </ul>
    </div>
  )
}

export default ListOptions