import React from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import {Droppable} from 'react-beautiful-dnd'
import Todo from './Todo'
import CompletedTasksImage from './CompletedTasksImage'
import TodoForm from './TodoForm'

const getListStyle = isDraggingOver => ({
  borderRadius: '10px',
  // background: isDraggingOver ? 'ghostwhite' : 'inherit',
});

// List Component
const List = ({data, edit, remove, currentListId, currentListName, handleSubmit, handleChange, text}) => {
  const noLists = Object.keys(data.lists).length === 0;
  const listId = noLists ? 'no-list' : currentListId;
  console.log(noLists)
  const todoIds = noLists ? [] : data.lists[currentListId].todoIds;
  const todos = noLists ? [] : todoIds.map(todoId => data.todos[todoId])
  let displayedTodos;
  let compTaskImg;
  if(todos.length > 0) {
    displayedTodos = todos.map((todo, index) => {
      return (
        <Todo todo={todo}
              listId={currentListId}
              key={todo.id}
              edit={edit}
              remove={remove}
              index={index}
        />
      )
    })
  } else {
    compTaskImg = <CompletedTasksImage currentListName={currentListName}/>;
  }
  
  return (
    <div id="listWrapper">
      <ul className="allTodosUl">
        <CSSTransitionGroup transitionName="EnterTransition"
          transitionAppear={ true }
          transitionAppearTimeout={ 150 }
          transitionEnter={ true }
          transitionEnterTimeout={ 150 }
          transitionLeave={ false }>
          <Droppable droppableId={listId}>
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
        currentList={currentListName}
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