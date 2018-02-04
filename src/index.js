import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import felixTheCat from './felix_the_cat.jpg'

// Component Structure
// --------------------
// Container
// --> Title
// --> Form
// --> List
// ----> Todo
// --> Footer

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
        value: "welcome to felix, a simple & modern to-do list app.",
        list: "welcome",
      },
      {
        id: -5,
        value: "felix was made using react.",
        list: "welcome",
      },
      {
        id: -4,
        value: "type into the above line to add a task. click on the '—' next to an existing task to delete it.",
        list: "welcome",
      },
      {
        id: -3,
        value: "complete tasks until you see felix!",
        list: "welcome",
      },
      {
        id: -2,
        value: "felix was designed and built by nico glennon.",
        list: "about",
      },
      {
        id: -1,
        value: "you may find the project on github at www.github.com/nicoglennon/felix.",
        list: "about",
      },
    ]

    const introLists = [
      {
        id: -2,
        name: "welcome",
      },
      {
        id: -1,
        name: "about",
      },
    ]

    const introCurrentList = 'welcome';
    const localStorageListOptions = JSON.parse(localStorage.getItem('listOptions'));
    console.log(localStorageListOptions);
    if (localStorageListOptions) {
      console.log(localStorageListOptions);
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
      console.log(localStorage);
      console.log(localStorage.getItem('listOptions'));

    }
    // bind the handler functions
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.handleListChange = this.handleListChange.bind(this);
    this.handleNewListButton = this.handleNewListButton.bind(this);
    this.handleRemoveList = this.handleRemoveList.bind(this);
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
    this.setState({ value: e.target.value.toLowerCase() });
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
    this.setState({ currentList: e.target.innerHTML });
    localStorage.setItem('currentList', e.target.innerHTML);
  }

  handleNewListButton(e) {
    const name = prompt("", "new list name");

    let repeatLists;
    let lowerCaseName;

    if (name !== null) {
      // trim whitespaces in name
      let trimmedName = name.trim();
      // if the name is not empty after trimming, carry out proccess
      if (trimmedName.length > 0) {
        lowerCaseName = trimmedName.toLowerCase();

        // see if this name exists already in our data
        repeatLists = this.state.listOptions.filter(listOption => {
          if (listOption.name === lowerCaseName) {
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
              name: lowerCaseName,
          }

          const newListFirstTodo = {
            id: Date.now(),
            value: 'this is \'' + lowerCaseName + '\', your new list.',
            list: lowerCaseName,
          }

          this.setState(prevState => {
            // set localStorage using the prevState obj
            localStorage.setItem('data', JSON.stringify(prevState.data.concat(newListFirstTodo)));
            localStorage.setItem('listOptions', JSON.stringify(prevState.listOptions.concat(newList)));
            localStorage.setItem('currentList', lowerCaseName);

            return {
              data: prevState.data.concat(newListFirstTodo),
              listOptions: prevState.listOptions.concat(newList),
              currentList: lowerCaseName,
            }
          })
        }
      }
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
      } else {
        // else, set current list to none
        this.setState({ currentList: '' });
        localStorage.setItem('currentList', '');
      }
    }
  }

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
          />

        </div>
        <div id="appContainer">
          <div id="formAndListsContainer">
            <Form handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              text={this.state.value}
              currentList={this.state.currentList}
            />
            <h2 className='listTitle'>{this.state.currentList}</h2>
            <List todos={this.state.data}
              remove={this.removeTodo}
              current={this.state.currentList}
            />
          </div>
          <SettingsButton />
        </div>
      </div>
		);
	}
}

const Sidebar = ({listOptions, handleListChange, currentList, handleNewListButton, handleRemoveList}) => {
  return (
    <div className="sidebarContentsWrapper">
      <Title />
      <ListOptions
        listOptions={listOptions}
        handleListChange={handleListChange}
        currentList={currentList}
        handleNewListButton={handleNewListButton}
        handleRemoveList={handleRemoveList}
      />
    </div>
  )
}

const ListOptions = ({listOptions, handleListChange, currentList, handleNewListButton, handleRemoveList}) => {
  let allListOptions = [];

  if(listOptions.length > 0) {

    allListOptions = listOptions.map(listOption => {
      let listOptionStyle;
      let removeList;
      if (listOption.name === currentList) {

        // current list style highlight
        listOptionStyle = {
          backgroundColor: '#E8E8E8',
          color: 'black',
        }
        removeList = handleRemoveList;
      }

      return (<ListOption
                listName={listOption.name}
                key={listOption.id}
                handleListChange={handleListChange}
                style={listOptionStyle}
                handleRemoveList={removeList}
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
      <span className='newListButtonSpan' onClick={handleNewListButton}>{'{＋}'}</span>
    </li>
  )
}

const ListOption = ({listName, handleListChange, style, handleRemoveList}) => {
  let removeButton;
  let moreButton;
  if (style) {
    removeButton = <button className="removeListButton" onClick={()=> {
      handleRemoveList(listName)
    }}><span>✕</span></button>;
    moreButton = <button className="moreListButton" onClick={()=> {}}><span>⋯</span></button>;
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

const Title = () => {
	return (
		<div id="titleWrapper">
			<a href="/" className='titleALink'><h1 className="titleHeader">felix</h1></a>
		</div>
	);
};

class Form extends React.Component {
  render() {
    return(
      <div id="formWrapper">
        <form onSubmit={this.props.handleSubmit}>
          <input
            onChange={this.props.handleChange}
            value={this.props.text}
            placeholder="add task..."
            disabled={this.props.currentList === '' ? true : false}
          />
        </form>
      </div>
    );
  };

}

// List Component
const List = ({todos, remove, current}) => {
  let filteredTodos = [];
  let displayedTodos = [];
  let felixImage = null;

  filteredTodos = todos.filter( todo => {
    return todo.list === current;
  })

  if(filteredTodos.length > 0) {
    displayedTodos = filteredTodos.map(todo => {
      return (<Todo todo={todo}
                    key={todo.id}
                    remove={remove}
              />)
    })
  } else {
    let felixMessage;
    if (current === '') {
      felixMessage = 'create a list in the sidebar!'
    } else {
      felixMessage = 'you\'re all caught up!'
    }

    displayedTodos.push(<li id="acu" key={current}><span className="wiredLink">{felixMessage}</span></li>)

    felixImage = <img className="felixTheCat" src={felixTheCat} alt="felix the cat" key={current} />
  }

  return (
    <div id="listWrapper">
      <ul className="allTodosUl">
        <CSSTransitionGroup transitionName="EnterTransition"
          transitionAppear={ true }
          transitionAppearTimeout={ 1000 }
          transitionEnter={ true }
          transitionEnterTimeout={ 350 }
          transitionLeave={ false }>
          {felixImage}
          {displayedTodos}
        </CSSTransitionGroup>
      </ul>
    </div>
  )
}

// single Todo Component
const Todo = ({todo, remove}) => {
  // single todo
  return (
      <div className="listItemWrapper"
           key={todo.id}
      >
        <li className="todos">
          {todo.value}
        </li>
        <button
          className="removeBtn"
          onClick={()=> {
            remove(todo.id)
          }}>
          <span>—</span>
        </button>
      </div>
  )
}

// hovering settings button
const SettingsButton = () => {
  return (
    <div className="settingsButtonWrapper">
      <a href="#" className="float"></a>
    </div>
  )
}

// Render the general Container to the DOM
ReactDOM.render(<App />, document.getElementById('root'));
