import React from 'react'

const NewListButton = ( {handleNewListButton} ) => {
  return (
    <li className='newListButton'>
      <span className='newListButtonSpan' onClick={handleNewListButton}>{'[＋]'}</span>
    </li>
  )
}

export default NewListButton

  