import React from 'react'
import ContentEditable from 'react-contenteditable'

const ListTitle = ({currentList, handleEditListInline}) => {
  return (
    <ContentEditable
      className="listTitle"
      placeholder="List Title"
      html={currentList} // innerHTML of the editable div
      disabled={!currentList}       // use true to disable edition
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