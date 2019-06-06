import React, { useState } from 'react'

const TodoForm = ({handleSubmit, handleChange, text, currentList}) => {
    
    const [focused, setFocused] = useState(false);

    const getFormStyle = (isFocused) => ({
        color: isFocused ? 'rgb(66, 66, 65)' : 'lightgray',
        transform: isFocused ? 'translateY(-3px)' : '',
        transition: 'color 300ms ease, transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)',
      });

    return(
        <div id="formWrapper" style={getFormStyle(focused)}>
            <span className="newTodoForm-plusSpan">＋</span>
            <form onSubmit={handleSubmit} className="newTodoForm">
            <input type="text"
                className="mainInput"
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onChange={handleChange}
                value={text || ''}
                placeholder="Add Item"
                style={currentList ? {} : {display: 'none'}}
            />
            </form>
        </div>
    );
}

export default TodoForm
