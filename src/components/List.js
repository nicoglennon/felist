import React from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import {Droppable, Draggable} from 'react-beautiful-dnd'
import Todo from './Todo'
import CompletedTasksImage from './CompletedTasksImage'
import TodoForm from './TodoForm'

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'inherit',
});

// List Component
const List = ({todos, edit, remove, current, handleSubmit, handleChange, text}) => {
  let filteredTodos = [];
  let displayedTodos = [];

  filteredTodos = todos.filter( todo => {
    return todo.list === current;
  })

  if(filteredTodos.length > 0) {
    displayedTodos = filteredTodos.map(todo => {
      return (
        <Todo todo={todo}
              key={todo.id}
              edit={edit}
              remove={remove}
        />
      )
    })
  } else {
    var compTaskImg = <CompletedTasksImage currentList={current}/>;
  }
  
  return (
    <div id="listWrapper">
      <ul className="allTodosUl">
        <CSSTransitionGroup transitionName="EnterTransition"
          transitionAppear={ true }
          transitionAppearTimeout={ 200 }
          transitionEnter={ true }
          transitionEnterTimeout={ 150 }
          transitionLeave={ false }>
          <Droppable droppableId={current}>
          {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}>
                          {displayedTodos}
                          {provided.placeholder}
                        </div>
          )}
          </Droppable>
        </CSSTransitionGroup>
      </ul>
      <TodoForm handleSubmit={handleSubmit}
        handleChange={handleChange}
        text={text}
        currentList={current}
      />
      <CSSTransitionGroup transitionName="EnterTransition"
        transitionAppear={ true }
        transitionAppearTimeout={ 200 }
        transitionEnter={ true }
        transitionEnterTimeout={ 150 }
        transitionLeave={ false }>
        {compTaskImg}
      </CSSTransitionGroup>
    </div>
  )
}

  export default List