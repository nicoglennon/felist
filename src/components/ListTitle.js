import React from 'react'
import ContentEditable from 'react-contenteditable'

const ListTitle = ({currentListName, handleEditListInline}) => {
  const listName = currentListName === null ? '' : currentListName;
  return (
    <ContentEditable
      className="listTitle"
      placeholder="List Title"
      html={listName} // innerHTML of the editable div
      disabled={listName === ''}       // use true to disable edition
      onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.target.blur();
          }
        }
      }
      onBlur={(e) => {
        handleEditListInline(e);
      }}
    />
  )
}

export default ListTitle