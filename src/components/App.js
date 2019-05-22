import React from 'react'
import SettingsButton from './SettingsButton'
import List from './List'
import Sidebar from './Sidebar'
import ListTitle from './ListTitle'
import TrashBucket from './TrashBucket'
import {DragDropContext} from 'react-beautiful-dnd'

// App component (intelligent)
class App extends React.Component {
    constructor(props) {
      super(props);
  
      // clear localStorage while on development
      localStorage.clear();
  
      // intro data:
      const introData = [
        {
          id: -6,
          value: "Welcome to Felist, a simple organizer. No need to log in or sign up, we'll remember you as long as you use this computer.",
          list: "Welcome 👋",
        },
        {
          id: -5,
          value: "Add a new item to this list by clicking the '＋ Add Item' button below. Click the '—' next to an existing item to remove it.",
          list: "Welcome 👋",
        },
        {
          id: -4,
          value: "Add a new list by clicking the [＋] button in the sidebar, or delete a list with the ✕ to the far left in the sidebar.",
          list: "Welcome 👋",
        },
        {
          id: -3,
          value: "Feel free to delete this list now. Happy organizing!",
          list: "Welcome 👋",
        },
      ]
  
      const introLists = [
        {
          id: -2,
          name: "Welcome 👋",
          todos: [
            {
              id: -6,
              value: "Welcome to Felist, a simple organizer. No need to log in or sign up, we'll remember you as long as you use this computer.",
            },
            {
              id: -5,
              value: "Add a new item to this list by clicking the '＋ Add Item' button below. Click the '—' next to an existing item to remove it.",
            },
            {
              id: -4,
              value: "Add a new list by clicking the [＋] button in the sidebar, or delete a list with the ✕ to the far left in the sidebar.",
            },
            {
              id: -3,
              value: "Feel free to delete this list now. Happy organizing!",
            },
          ]
        },
        {
          id: -1,
          name: "Your List 💫",
          todos: []
        }
      ]
  
      const introCurrentList = "Welcome 👋"; // name of the 'Welcome' list
      const localStorageListOptions = JSON.parse(localStorage.getItem('listOptions'));
      if (localStorageListOptions) {
        this.state = {
          data: JSON.parse(localStorage.getItem('data')),
          value: '',
          listOptions: JSON.parse(localStorage.getItem('listOptions')),
          currentList: localStorage.getItem('currentList'),
          dragging: false,
        };
      } else {
        this.state = {
          data: introData,
          value: '',
          listOptions: introLists,
          currentList: introCurrentList,
          dragging: false,
        };
        // set the localStorage obj to the initializing values
        localStorage.setItem('data', JSON.stringify(introData));
        localStorage.setItem('listOptions', JSON.stringify(introLists));
        localStorage.setItem('currentList', introCurrentList);
        // window.history.pushState('','','/' + introCurrentList.replace(/\s+/g, '-').toLowerCase());
      }
      // bind the handler functions
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.removeTodo = this.removeTodo.bind(this);
      this.handleListChange = this.handleListChange.bind(this);
      this.handleNewListButton = this.handleNewListButton.bind(this);
      this.handleRemoveList = this.handleRemoveList.bind(this);
      this.handleEditListButton = this.handleEditListButton.bind(this);
      this.handleTodoChange = this.handleTodoChange.bind(this);
      this.handleEditListInline = this.handleEditListInline.bind(this);
    }

    onDragEnd = (dropResult) => {
      console.log('Drag Ended');
      console.log(dropResult)
      this.setState({
        dragging: false,
      })

      if(dropResult.destination){
        if(dropResult.destination.droppableId === 'trash'){
          this.removeTodo(dropResult.draggableId)
        }
      }
    }

    onDragStart = () => {
      console.log('Drag started');
      this.setState({
        dragging: true,
      })
    }
  
    handleSubmit(e) {
      // Prevent submission
      e.preventDefault();
  
      if (this.state.value.trim() === '') {
        return;
      }
  
      const newTodo = {
        id: Date.now(),
        value: this.state.value.trim(),
        list: this.state.currentList,
      }
  
      this.setState(prevState => {
        localStorage.setItem('data', JSON.stringify(prevState.data.concat(newTodo)));
        return {
          data: prevState.data.concat(newTodo),
          value: '',
        }
      })
    }
  
    handleChange(e) {
      this.setState({ value: e.target.value });
    }
  
    removeTodo(id) {
      const newList = this.state.data.filter(todo => {
        if (todo.id !== id) {
          return todo;
        }
        return null;
      })
      this.setState({ data: newList });
      localStorage.setItem('data', JSON.stringify(newList));
    }
  
    handleListChange(e) {
      this.setState({ currentList: e.target.innerHTML, value: ''});
      localStorage.setItem('currentList', e.target.innerHTML);
      // window.history.pushState('','','/' + e.target.innerHTML.replace(/\s+/g, '-').toLowerCase());
  
    }
  
    handleNewListButton(e) {
      const name = prompt("", "new list name");
  
      let repeatLists;
  
      if (name !== null) {
        // trim whitespaces in name
        let trimmedName = name.trim();
        // if the name is not empty after trimming, carry out proccess
        if (trimmedName.length > 0) {
          // see if this name exists already in our data
          repeatLists = this.state.listOptions.filter(listOption => {
            if (listOption.name === trimmedName) {
              return listOption;
            } else {
              return null;
            }
          })
  
          // if the name is in our data, alert user
          if (repeatLists.length > 0) {
            alert("A list called '" + name + "' already exists.");
          } else {
            const newList = {
                id: Date.now(),
                name: trimmedName,
            }
  
            const newListFirstTodo = {
              id: Date.now(),
              value: 'This is \'' + trimmedName + '\', your new list.',
              list: trimmedName
            }
  
            this.setState(prevState => {
              // set localStorage using the prevState obj
              localStorage.setItem('data', JSON.stringify(prevState.data.concat(newListFirstTodo)));
              localStorage.setItem('listOptions', JSON.stringify(prevState.listOptions.concat(newList)));
              localStorage.setItem('currentList', trimmedName);
              // window.history.pushState('','','/' + trimmedName.replace(/\s+/g, '-').toLowerCase());
  
              return {
                data: prevState.data.concat(newListFirstTodo),
                listOptions: prevState.listOptions.concat(newList),
                currentList: trimmedName,
              }
            })
          }
        }
      }
    }
  
    handleEditListInline(e){
      var oldListName = this.state.currentList;
      var newListName = e.target.innerHTML;
      this.editListName(oldListName, newListName);
    }
  
    editListName(oldListName, newListName){
      newListName = newListName.replace(/&nbsp;/g, " ");
      if (newListName !== null) {
        // trim whitespaces in name
        let trimmedName = newListName.trim();
        // if the name is not empty after trimming, carry out proccess
        if (trimmedName.length > 0) {
          // see if this name exists already in our data
          const existingList = this.state.listOptions.filter(listOption => {
            if (listOption.name === trimmedName) {
              return listOption;
            } else {
              return null;
            }
          })
          if(existingList.length !== 0) {
          } else {
            // filter the listOptions to update the listName
            const newListOptions = this.state.listOptions.filter(listOption => {
              if (listOption.name === oldListName) {
                listOption.name = trimmedName;
              }
              return listOption;
            })
  
            // filter all todos to change ones associated with the renamed list
            const newData = this.state.data.filter(todo => {
              if (todo.list === oldListName) {
                todo.list = trimmedName;
              }
              return todo;
            })
  
            // set new data
            this.setState({ data: newData });
            localStorage.setItem('data', JSON.stringify(newData));
  
            // set new listOptions
            this.setState({ listOptions: newListOptions });
            localStorage.setItem('listOptions', JSON.stringify(newListOptions));
  
            // set current list to new list name
            this.setState({ currentList: trimmedName });
            localStorage.setItem('currentList', trimmedName);
            // window.history.pushState('','','/' + trimmedName.replace(/\s+/g, '-').toLowerCase());
  
          }
        }
      }
    }
  
    handleEditListButton(oldListName) {
      const newListName = prompt("", oldListName);
      if (newListName){
        this.editListName(oldListName, newListName);
      }
    }
  
    handleRemoveList(listName) {
      const c = window.confirm("Deleting your '" + listName + "' list and all its tasks — Continue?");
      if (c === true) {
        let index;
        // filter the listOptions to get rid of this listName
        const newListOptions = this.state.listOptions.filter(listOption => {
          if (listOption.name !== listName) {
            return listOption;
          } else {
            index = this.state.listOptions.indexOf(listOption);
            if (index < 0) {
              index = 0;
            } else if (index === this.state.listOptions.length - 1) {
              index -= 1;
            }
            return null;
          }
        })
  
        // filter all todos to delete ones associated with this list
        const newData = this.state.data.filter(todo => {
          if (todo.list !== listName) {
            return todo;
          }
          return null;
        })
  
        // set new data
        this.setState({ data: newData });
        localStorage.setItem('data', JSON.stringify(newData));
  
        // set new listOptions
        this.setState({ listOptions: newListOptions });
        localStorage.setItem('listOptions', JSON.stringify(newListOptions));
  
        if (newListOptions.length > 0) {
          // if the remaining lists are one or more, replace index
          this.setState({ currentList: newListOptions[index].name });
          localStorage.setItem('currentList', newListOptions[index].name);
          // window.history.pushState('','','/' + newListOptions[index].name.replace(/\s+/g, '-').toLowerCase());
  
        } else {
          // else, set current list to none
          this.setState({ currentList: '' });
          localStorage.setItem('currentList', '');
          // window.history.pushState('','','/');
        }
      }
    }
  
    handleTodoChange(todoId, newValue) {
      const newData = this.state.data.filter(todo => {
        if (todo.id === todoId) {
          var editedTodo = todo;
          editedTodo.value = newValue;
          return editedTodo;
        } else {
          return todo;
        }
      })
      this.setState({ data: newData });
      localStorage.setItem('data', JSON.stringify(newData));
    }
  
    // handleSubmitTodo(e) {
    //   e.preventDefault();
    // }
  
    render() {
      return (
        <div id="pageContainer">
          <DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart}>
            <div id="sidebarContainer">
              <Sidebar
                listOptions={this.state.listOptions}
                handleListChange={this.handleListChange}
                currentList={this.state.currentList}
                handleNewListButton={this.handleNewListButton}
                handleRemoveList={this.handleRemoveList}
                handleEditListButton={this.handleEditListButton}
                dragging={this.state.dragging}
              />
    
            </div>
            <div id="appContainer">
              <TrashBucket dragging={this.state.dragging}/>
              <div id="formAndListsContainer">
                <ListTitle currentList={this.state.currentList}
                  handleEditListInline={this.handleEditListInline}
                />
                <List todos={this.state.data}
                  edit={this.handleTodoChange}
                  remove={this.removeTodo}
                  current={this.state.currentList}
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