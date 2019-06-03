import React from 'react'
import SettingsButton from './SettingsButton'
import List from './List'
import Sidebar from './Sidebar'
import ListTitle from './ListTitle'
import TrashBucket from './TrashBucket'
import {DragDropContext} from 'react-beautiful-dnd'
import shortid from "shortid"

import { connect } from 'react-redux'
import actions from '../redux/actions'
import { bindActionCreators } from 'redux'

function mapStateToProps(state) {
  return {state: state}
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

class App extends React.Component {
  
  onDragEnd = (dropResult) => {
    this.setState({
      dragging: false,
    })

    const { destination, source, draggableId } = dropResult;

    // no destination does nothing
    if (!destination){
      return;
    }

    // dropped at same spot does nothing
    if(destination.droppableId === source.droppableId && destination.index === source.index){
      return;
    }

    if(destination.droppableId === 'trash'){
      this.removeTodo(draggableId);
      return;
    }

    const list = this.state.refactoredData.lists[source.droppableId];
    const newTodoIds = Array.from(list.todoIds);
    newTodoIds.splice(source.index, 1);
    newTodoIds.splice(destination.index, 0, draggableId);

    const newList = {
      ...list,
      todoIds: newTodoIds,
    }

    const newData = {
      ...this.state.refactoredData,
      lists: {
        ...this.state.refactoredData.lists,
      [newList.id]: newList,
      },
    }

    const newState = {
      ...this.state,
      refactoredData: newData,
      dragging: false,
    }

    this.setState(newState);
    localStorage.setItem('refactoredData', JSON.stringify(newData));
  }

  onDragStart = () => {
    this.setState({
      dragging: true,
    })
  }

  handleSubmit = (e) => {
    // Prevent submission
    e.preventDefault();
    const {refactoredData, value, currentListId } = this.state;

    if (value.trim() === '') {
      return;
    }

    const newTodoId = shortid.generate();

    const newTodo = {
      id: newTodoId,
      value: this.state.value.trim(),
    }

    let updatedTodoIds = Array.from(refactoredData.lists[currentListId].todoIds);
    updatedTodoIds.push(newTodoId);

    const newData = {
      ...refactoredData,
      todos: {
        ...refactoredData.todos,
        [newTodoId]: newTodo,
      },
      lists: {
        ...refactoredData.lists,
        [currentListId]: {
          ...refactoredData.lists[currentListId],
          todoIds: updatedTodoIds,
        }
      }
    }

    this.setState({
      refactoredData: newData,
      value: '',
    })

    localStorage.setItem('refactoredData', JSON.stringify(newData));
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  }

  removeTodo = (id) => {
    const {refactoredData, currentListId} = this.state;

    const newTodos = {...refactoredData.todos};
    delete newTodos[id];
    const newTodoIds = refactoredData.lists[currentListId].todoIds.filter(todoid => todoid !== id);

    const newData = {
      ...refactoredData,
      todos: newTodos,
      lists: {
        ...refactoredData.lists,
        [currentListId]: {
          ...refactoredData.lists[currentListId],
          todoIds: newTodoIds,
        }
      }
    }

    this.setState({ refactoredData: newData });
    localStorage.setItem('refactoredData', JSON.stringify(newData));
  }

  handleListChange = (listId) => {
    this.setState({ currentListId: listId, value: ''});
    localStorage.setItem('currentListId', listId);  
  }

  handleNewListButton = (e) => {
    const name = prompt("", "new list name");

    if (name !== null) {
      const { refactoredData } = this.state;
      // trim whitespaces in name
      let trimmedName = name.trim();
      // if the name is not empty after trimming, carry out proccess
      if (trimmedName.length > 0) {

        const newListId = shortid.generate();
        let newListOrder = Array.from(refactoredData.listOrder);
        newListOrder.push(newListId);

        const newData = {
          ...refactoredData,
          lists: {
            ...refactoredData.lists,
            [newListId]: {
              id: newListId,
              name: trimmedName,
              todoIds: [],
            }
          },
          listOrder: newListOrder,
        }

        this.setState({
          refactoredData: newData,
          currentListId: newListId
        })

        // update localstorage
        localStorage.setItem('refactoredData', JSON.stringify(newData));
        localStorage.setItem('currentListId', newListId);
      }
    }
  }

  handleEditListInline = (e) => {
    const { currentListId } = this.state;
    const listId = currentListId;
    const newListName = e.target.innerHTML;
    this.editListName(listId, newListName);
  }

  editListName = (listId, newListName) => {
    if(newListName){
      newListName = newListName.replace(/&nbsp;/g, " ");
      let trimmedName = newListName.trim();
      if (trimmedName.length > 0) {
        const {refactoredData} = this.state;
        const newData = {
          ...refactoredData,
          lists: {
            ...refactoredData.lists,
            [listId]: {
              ...refactoredData.lists[listId],
              name: trimmedName,
            }
          }
        }
        this.setState({
          refactoredData: newData,
        })
        localStorage.setItem('refactoredData', JSON.stringify(newData));
      }
    }
  }

    handleEditListButton = (listId) => {
    const {refactoredData} = this.state;
    const newListName = prompt("", refactoredData.lists[listId].name);
    if (newListName){
      this.editListName(listId, newListName);
    }
  }

  handleRemoveList = (listId) => {
    const { refactoredData } = this.state;
    const listName = refactoredData.lists[listId].name;
    const c = window.confirm("Deleting your '" + listName + "' list and all its tasks — Continue?");
    if (c === true) {
      const removedListIndex = refactoredData.listOrder.indexOf(listId);
      let newLists = {...refactoredData.lists};
      delete newLists[listId];  
      const newIndex = removedListIndex - 1 < 0 ? 1 : removedListIndex - 1; 
      const newCurrentListId = refactoredData.listOrder[newIndex];
      const newListOrder = refactoredData.listOrder.filter(id => id !== listId);
      const newData = {
        ...refactoredData,
        lists: newLists,
        listOrder: newListOrder,
      }
      this.setState({
        refactoredData: newData,
        currentListId: newCurrentListId,
      })
      localStorage.setItem('refactoredData', JSON.stringify(newData)); 
      localStorage.setItem('currentListId', newCurrentListId);       
    }
  }

  handleTodoChange = (todoId, newValue) => {
    const { refactoredData } = this.state;
    const newData = {
      ...refactoredData,
      todos: {
        ...refactoredData.todos,
        [todoId]: {
          ...refactoredData.todos[todoId],
          value: newValue,
        }
      }
    }
    this.setState({
      refactoredData: newData
    });

    localStorage.setItem('refactoredData', JSON.stringify(newData));
  }


  render() {
    const {refactoredData, dragging, currentListId, value} = this.props.state;
    const currentListName = Object.keys(refactoredData.lists).length === 0 ? null : refactoredData.lists[this.props.state.currentListId].name;
    return (
      <div id="pageContainer">
        <DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart}>
          <div id="sidebarContainer">
            <Sidebar
              data={refactoredData}
              handleListChange={this.handleListChange}
              currentListName={currentListName}
              currentListId={currentListId}
              handleNewListButton={this.handleNewListButton}
              handleRemoveList={this.handleRemoveList}
              handleEditListButton={this.handleEditListButton}
              dragging={dragging}
            />
  
          </div>
          <div id="appContainer">
            <TrashBucket dragging={dragging}/>
            <div id="formAndListsContainer">
              <ListTitle currentListName={currentListName}
                handleEditListInline={this.handleEditListInline}
              />
              <List data={refactoredData}
                edit={this.handleTodoChange}
                remove={this.removeTodo}
                currentListName={currentListName}
                currentListId={currentListId}
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                text={value}
              />
            </div>
            <SettingsButton />
          </div>
        </DragDropContext>
      </div>
        );
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(App)