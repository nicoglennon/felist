import React from 'react'

const ListOption = ({listName, handleListChange, style, handleRemoveList, handleEditListButton}) => {
  let removeButton;
  let moreButton;
  if (style) {
    removeButton = <button className="removeListButton" onClick={()=> {
      handleRemoveList(listName)
    }}><span>✕</span></button>;
    moreButton = <button className="moreListButton" onClick={()=> {handleEditListButton(listName)}}><span>⋯</span></button>;
  }
  return (
    <div className='listOptionLine'>
      {removeButton}
      {moreButton}
      <li className='listOption'
        style={style}
        onClick={handleListChange}>
        {listName}
      </li>
    </div>
  )
}

export default ListOption

  