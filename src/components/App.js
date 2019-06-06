import React from 'react'
import SettingsButton from './SettingsButton'
import List from './List'
import Sidebar from './Sidebar'
import ListTitle from './ListTitle'
import TrashBucket from './TrashBucket'
import { DragDropContext } from 'react-beautiful-dnd'

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
    this.props.actions.endDrag();

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

    this.props.actions.moveTodo(dropResult)
  }

  onDragStart = () => {
    this.props.actions.startDrag();
  }

  handleSubmit = (e) => {
    // Prevent submission
    e.preventDefault();
    const { value } = this.props.state;

    const trimmedValue = value.trim();
    if (trimmedValue === '') {
      return;
    }

    this.props.actions.submitTodo(trimmedValue);
  }

  handleChange = (e) => {
    this.props.actions.changeNewTodoForm(e.target.value);
  }

  removeTodo = (id) => {
    this.props.actions.removeTodo(id);
  }

  handleListChange = (listId) => {
    this.props.actions.changeList(listId);
  }

  handleNewListButton = (e) => {
    const name = prompt("", "new list name");

    if (name !== null) {
      let trimmedName = name.trim();
      // if the name is not empty after trimming, carry out proccess
      if (trimmedName.length > 0) {
        this.props.actions.newList(name);
      }
    }
  }

  handleEditListInline = (e) => {
    const { currentListId } = this.props.state;
    const listId = currentListId;
    const newListName = e.target.innerHTML;
    this.editListName(listId, newListName);
  }

  editListName = (listId, newListName) => {
    if(newListName){
      newListName = newListName.replace(/&nbsp;/g, " ");
      let trimmedName = newListName.trim();
      if (trimmedName.length > 0 && trimmedName !== this.props.state.refactoredData.lists[listId].name) {
        this.props.actions.editListName(listId, trimmedName);
      }
    }
  }

    handleEditListButton = (listId) => {
    const {refactoredData} = this.props.state;
    const newListName = prompt("", refactoredData.lists[listId].name);
    if (newListName){
      this.editListName(listId, newListName);
    }
  }

  handleRemoveList = (listId) => {
    const { refactoredData } = this.props.state;
    const listName = refactoredData.lists[listId].name;
    const confirmation = window.confirm("Deleting your '" + listName + "' list and all its tasks — Continue?");
    if (confirmation) {
      this.props.actions.removeList(listId);    
    }
  }

  handleTodoChange = (todoId, newValue) => {  
    if(newValue !== this.props.state.refactoredData.todos[todoId].value){
      this.props.actions.changeTodo(todoId,newValue);
    }
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