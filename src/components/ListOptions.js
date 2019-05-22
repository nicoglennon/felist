import React from 'react'
import ListOption from './ListOption'
import NewListButton from './NewListButton'

const ListOptions = ({listOptions, handleListChange, currentList, handleNewListButton, handleRemoveList, handleEditListButton, dragging}) => {
  let allListOptions = [];
  if(listOptions.length > 0) {

    allListOptions = listOptions.map(listOption => {
      let listOptionStyle;
      let removeList;
      let editList;
      if (listOption.name === currentList) {

        // current list style highlight
        listOptionStyle = {
          backgroundColor: '#E8E8E8',
          color: 'black',
        }
        removeList = handleRemoveList;
        editList = handleEditListButton;
      }

      return (<ListOption
                listName={listOption.name}
                key={listOption.id}
                handleListChange={handleListChange}
                style={listOptionStyle}
                handleRemoveList={removeList}
                handleEditListButton={editList}
                dragging={dragging}
              />)
    })
  }

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