import React from 'react'

const TodoForm = ({handleSubmit, handleChange, text, currentList}) => {
    return(
        <div id="formWrapper">
            <form onSubmit={handleSubmit}>
            <input
                className="mainInput"
                onChange={handleChange}
                value={text}
                placeholder="＋  Add Item"
                style={currentList ? {} : {display: 'none'}}
            />
            </form>
        </div>
    );
}

export default TodoForm
