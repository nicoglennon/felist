import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import ContentEditable from 'react-contenteditable';
import FelixImg from './felix2.jpg';

// App component (intelligent)
class App extends React.Component {
  constructor(props) {
    super(props);

    // clear localStorage while on development
    // localStorage.clear();

    // intro data:
    const introData = [
      {
        id: -6,
        value: "Welcome to Felist, a simple & minimal organizer.",
        list: "Welcome 👋",
      },
      {
        id: -5,
        value: "Add a new item to a list by clicking the '＋Add Item' button below. Click the '—' next to an existing item to remove it.",
        list: "Welcome 👋",
      },
      {
        id: -4,
        value: "Add a new list by clicking the [＋] button in the sidebar, or remove a list with the ✕ to the far right.",
        list: "Welcome 👋",
      },
      {
        id: -3,
        value: "Happy writing!",
        list: "Welcome 👋",
      },
      {
        id: -2,
        value: "Felist was designed and built by Nico Glennon.",
        list: "About 🔮",
      },

      {
        id: -1,
        value: "More about him at nico.gl/.",
        list: "About 🔮",
      }
    ]

    const introLists = [
      {
        id: -2,
        name: "Welcome 👋",
        todos: [
          {
            id: -6,
            value: "Welcome to Felist, a simple & modern organizer."
          },
          {
            id: -5,
            value: "Add a new item to a list by clicking the 'Add Item' button below. Click the '—' next to an existing item to remove it."
          },
          {
            id: -4,
            value: "Add a new list by clicking the [＋] button in the sidebar, and remove it with the ✕ to the far right."
          },
          {
            id: -3,
            value: "Happy writing!"
          }
        ]
      },
      {
        id: -1,
        name: "About 🔮",
        todos: [
          {
            id: -2,
            value: "Felist was designed and built by Nico Glennon."
          },
          {
            id: -1,
            value: "More about him at nico.gl/."
          }
        ]
      },
      {
        id: 0,
        name: "Your List 🦄",
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
      };
    } else {
      this.state = {
        data: introData,
        value: '',
        listOptions: introLists,
        currentList: introCurrentList,
      };
      // set the localStorage obj to the initializing values
      localStorage.setItem('data', JSON.stringify(introData));
      localStorage.setItem('listOptions', JSON.stringify(introLists));
      localStorage.setItem('currentList', introCurrentList);
      // window.history.pushState('','','/' + introCurrentList.replace(/\s+/g, '-').toLowerCase());
      document.title = introCurrentList;
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
    document.title = e.target.innerHTML;
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
            document.title = trimmedName;

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
          document.title = trimmedName;
        }
      }
    }
  }

  handleEditListButton(oldListName) {
    const newListName = prompt("", oldListName);
    this.editListName(oldListName, newListName);
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
        document.title = newListOptions[index].name;

      } else {
        // else, set current list to none
        this.setState({ currentList: '' });
        localStorage.setItem('currentList', '');
        // window.history.pushState('','','/');
        document.title = 'Felist';
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
        <div id="sidebarContainer">
          <Sidebar
            listOptions={this.state.listOptions}
            handleListChange={this.handleListChange}
            currentList={this.state.currentList}
            handleNewListButton={this.handleNewListButton}
            handleRemoveList={this.handleRemoveList}
            handleEditListButton={this.handleEditListButton}
          />

        </div>
        <div id="appContainer">
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
      </div>
		);
	}
}

const ListTitle = ({currentList, handleEditListInline}) => {
  return (
    <ContentEditable
      className="listTitle"
      placeholder="List Title"
      html={currentList} // innerHTML of the editable div
      disabled={false}       // use true to disable edition
      onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.target.blur();
          }
        }
      }
      onBlur={(e) => {
        handleEditListInline(e);
      }}
    />
  )
}

const Sidebar = ({listOptions, handleListChange, currentList, handleNewListButton, handleRemoveList, handleEditListButton}) => {
  return (
    <div className="sidebarContentsWrapper">
      <ListOptions
        listOptions={listOptions}
        handleListChange={handleListChange}
        currentList={currentList}
        handleNewListButton={handleNewListButton}
        handleRemoveList={handleRemoveList}
        handleEditListButton={handleEditListButton}
      />
    </div>
  )
}

const ListOptions = ({listOptions, handleListChange, currentList, handleNewListButton, handleRemoveList, handleEditListButton}) => {
  let allListOptions = [];

  if(listOptions.length > 0) {

    allListOptions = listOptions.map(listOption => {
      let listOptionStyle;
      let removeList;
      let editList;
      if (listOption.name === currentList) {

        // current list style highlight
        listOptionStyle = {
          backgroundColor: '#E8E8E8',
          color: 'black',
        }
        removeList = handleRemoveList;
        editList = handleEditListButton;
      }

      return (<ListOption
                listName={listOption.name}
                key={listOption.id}
                handleListChange={handleListChange}
                style={listOptionStyle}
                handleRemoveList={removeList}
                handleEditListButton={editList}
              />)
    })
  }

  return (
    <div className="listOptionsWrapper">
      <ul className="listOptionsUl">
        {allListOptions}
        <NewListButton
          handleNewListButton={handleNewListButton}>
        </NewListButton>
      </ul>
    </div>
  )
}

const NewListButton = ( {handleNewListButton} ) => {
  return (
    <li className='newListButton'>
      <span className='newListButtonSpan' onClick={handleNewListButton}>{'[＋]'}</span>
    </li>
  )
}

const ListOption = ({listName, handleListChange, style, handleRemoveList, handleEditListButton}) => {
  let removeButton;
  let moreButton;
  if (style) {
    removeButton = <button className="removeListButton" onClick={()=> {
      handleRemoveList(listName)
    }}><span>✕</span></button>;
    moreButton = <button className="moreListButton" onClick={()=> {handleEditListButton(listName)}}><span>⋯</span></button>;
  }
  return (
    <div className='listOptionLine'>
      {removeButton}
      {moreButton}
      <li className='listOption'
        style={style}
        onClick={handleListChange}>
        {listName}
      </li>
    </div>
  )
}

class Form extends React.Component {
  render() {
    return(
      <div id="formWrapper">
        <form onSubmit={this.props.handleSubmit}>
          <input
            className="mainInput"
            onChange={this.props.handleChange}
            value={this.props.text}
            placeholder="＋  Add Item"
            style={this.props.currentList === '' ? {display: 'none'} : {}}
          />
        </form>
      </div>
    );
  };

}

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
          {/* {felixImage} */}
          {displayedTodos}
        </CSSTransitionGroup>
      </ul>
      <Form handleSubmit={handleSubmit}
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

const CompletedTasksImage = ({currentList}) => {
  var imageMessage = (currentList === '') ? 'Create a new list!' : 'Nothing here yet.';

  return (
    <div className="TasksImageWrapper">
      <img className="felixTheCat" src={FelixImg} alt="Tasks are Complete."/>
      <li id="acu"><span className="wiredLink">{imageMessage}</span></li>
    </div>
  )
}

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

// hovering settings button
const SettingsButton = () => {
  return (
    <div className="settingsButtonWrapper">
      <a href="" className="float">
        <div className="paperPlaneDiv">
          {/* <img src={PaperPlane} className="paperPlaneImg"/> */}
        </div>
      </a>
    </div>
  )
}

// Render the general Container to the DOM
ReactDOM.render(<App />, document.getElementById('root'));
