import React from 'react'
import SettingsButton from './SettingsButton'
import List from './List'
import Sidebar from './Sidebar'
import ListTitle from './ListTitle'
import TrashBucket from './TrashBucket'
import {DragDropContext} from 'react-beautiful-dnd'
import shortid from "shortid";

// App component (intelligent)
class App extends React.Component {
    constructor(props) {
      super(props);
  
      // clear localStorage while on development
      localStorage.clear();
  
      // intro data:
      const refactoredData = {
        todos: {
          'todo-1': {
            id: 'todo-1',
            value: "Welcome to Felist, a simple organizer. No need to log in or sign up, we'll remember you as long as you use this computer.",
          },
          'todo-2': {
            id: 'todo-2',
            value: "Add a new item to this list by clicking the '＋ Add Item' button below.",
          },
          'todo-3': {
            id: 'todo-3',
            value: 'To delete an item, drag it from the handle (☰) and drop it into the red box on top of the screen.',
          },
          'todo-4': {
            id: 'todo-4',
            value: "Add a new list by clicking the [＋] button in the sidebar, or delete a list with the ✕ to the far left in the sidebar.",
          },
          'todo-5': {
            id: 'todo-5',
            value: "Feel free to delete this list now. Happy organizing!",
          },
          'todo-6': {
            id: 'todo-6',
            value: "This is your first list!",
          },
        },
        lists: {
          'list-1': {
            id: 'list-1',
            name: "Welcome 👋",
            todoIds: ['todo-1', 'todo-2', 'todo-3', 'todo-4', 'todo-5']
          },
          'list-2': {
            id: 'list-2',
            name: "Your List 🎉",
            todoIds: ['todo-6']
          }
        },
        listOrder: ['list-1', 'list-2']
      }
  
      const introCurrentListId = 'list-1'; // name of the 'Welcome' listc
      
      let initialState;
      const storedRefactoredData = JSON.parse(localStorage.getItem('refactoredData'));
      if (storedRefactoredData) {
        initialState = {
          value: '',
          currentListId: localStorage.getItem('currentListId'),
          refactoredData: storedRefactoredData,
          dragging: false,
        };
      } else {
        initialState = {
          value: '',
          currentListId: introCurrentListId,
          refactoredData: refactoredData,
          dragging: false,
        };
        // set the localStorage obj to the initializing values
        localStorage.setItem('currentListId', introCurrentListId);
        localStorage.setItem('refactoredData', JSON.stringify(refactoredData));
      }

      // set initial state to either fresh state or localstorage
      this.state = initialState;

      // bind the handler functions
      this.handleEditListInline = this.handleEditListInline.bind(this);
    }

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
        const numberOfLists = refactoredData.listOrder.length;
        let newLists = {...refactoredData.lists};
        delete newLists[listId];  
        const newIndex = removedListIndex - 1 < 0 ? 1 : removedListIndex - 1; 
        console.log(newIndex);
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
      const {refactoredData} = this.state;
      const currentListName = Object.keys(refactoredData.lists).length === 0 ? null : refactoredData.lists[this.state.currentListId].name;
      
      return (
        <div id="pageContainer">
          <DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart}>
            <div id="sidebarContainer">
              <Sidebar
                data={refactoredData}
                handleListChange={this.handleListChange}
                currentListName={currentListName}
                currentListId={this.state.currentListId}
                handleNewListButton={this.handleNewListButton}
                handleRemoveList={this.handleRemoveList}
                handleEditListButton={this.handleEditListButton}
                dragging={this.state.dragging}
              />
    
            </div>
            <div id="appContainer">
              <TrashBucket dragging={this.state.dragging}/>
              <div id="formAndListsContainer">
                <ListTitle currentListName={currentListName}
                  handleEditListInline={this.handleEditListInline}
                />
                <List data={refactoredData}
                  edit={this.handleTodoChange}
                  remove={this.removeTodo}
                  currentListName={currentListName}
                  currentListId={this.state.currentListId}
                  handleSubmit={this.handleSubmit}
                  handleChange={this.handleChange}
                  text={this.state.value}
                />
              </div>
              <SettingsButton />
            </div>
          </DragDropContext>
        </div>
          );
      }
  }

  export default App