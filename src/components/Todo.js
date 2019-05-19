import React from 'react'
import ContentEditable from 'react-contenteditable'

// single Todo Component
const Todo = ({todo, edit, remove}) => {
	// single todo
	return (
		<div className="listItemWrapper"
					key={todo.id}
		>
			<button
				className="removeBtn"
				onClick={()=> {
					remove(todo.id)
				}}>
				<span>—</span>
			</button>
				<ContentEditable
					className="todosInput"
					html={todo.value} // innerHTML of the editable div
					disabled={false}       // use true to disable edition
					onChange={(e) => {edit(todo.id, e.target.value)}}// handle innerHTML change
					onKeyPress={(e) => {
							if (e.key === 'Enter') {
								e.target.blur();
							}
						}
					}
					onBlur={(e) => {
						var value = e.target.innerHTML.replace(/(&nbsp;)/g, ' ');
						if(value.trim() === '') {
							remove(todo.id);
						} else {
							edit(todo.id, value.trim());
						}
					}}
				/>
		</div>
	)
}

export default Todo