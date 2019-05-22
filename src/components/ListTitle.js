import React from 'react'
import ContentEditable from 'react-contenteditable'

const ListTitle = ({currentListName, handleEditListInline}) => {
  return (
    <ContentEditable
      className="listTitle"
      placeholder="List Title"
      html={currentListName} // innerHTML of the editable div
      disabled={!currentListName}       // use true to disable edition
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