import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import ExpandingSearchbox from './expanding-searchbox.js';
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

    this.state = {
      data: introData,
      value: '',
      listOptions: introLists,
      currentList: introCurrentList,
    };
    // bind the handler functions
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.handleListChange = this.handleListChange.bind(this);
    this.handleNewListButton = this.handleNewListButton.bind(this);
  }

  handleSubmit(e) {
    // Prevent submission
    e.preventDefault();

    if (this.state.value === '') {
      return;
    }

    const newTodo = {
      id: Date.now(),
      value: this.state.value,
      list: this.state.currentList,
    }

    this.setState(prevState => {
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
  }

  handleListChange(e) {
    this.setState({ currentList: e.target.innerHTML });
  }

  handleNewListButton(e) {
    const name = prompt("", "new list name");

    if (name === null || name === "") {

    } else {
      const lowerCaseName = name.toLowerCase()
      const newList = {
          id: Date.now(),
          name: lowerCaseName,
      }

      const newListFirstTodo = {
        id: Date.now(),
        value: 'this is ' + lowerCaseName + ', your new list.',
        list: lowerCaseName,
      }

      this.setState(prevState => {
        return {
          data: prevState.data.concat(newListFirstTodo),
          listOptions: prevState.listOptions.concat(newList),
          currentList: lowerCaseName,
        }
      })
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
          />

        </div>
        <div id="appContainer">
          <div id="formAndListsContainer">
            <Form handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              text={this.state.value}
            />
            <h2 className='listTitle'>{this.state.currentList}</h2>
            <List todos={this.state.data}
              remove={this.removeTodo}
              current={this.state.currentList}
            />
          </div>
        </div>
      </div>
		);
	}
}

const Sidebar = ({listOptions, handleListChange, currentList, handleNewListButton}) => {
  return (
    <div className="sidebarContentsWrapper">
      <Title />
      <ListOptions
        listOptions={listOptions}
        handleListChange={handleListChange}
        currentList={currentList}
        handleNewListButton={handleNewListButton}
      />
    </div>
  )
}

const ListOptions = ({listOptions, handleListChange, currentList, handleNewListButton}) => {
  let allListOptions = [];

  if(listOptions.length > 0) {


    allListOptions = listOptions.map(listOption => {
      let listOptionStyle = {};
      if (listOption.name === currentList) {

        // current list style highlight
        listOptionStyle = {
          backgroundColor: '#E8E8E8',
          color: 'black',
        }

      }
      return (<ListOption
                listName={listOption.name}
                key={listOption.id}
                handleListChange={handleListChange}
                style={listOptionStyle}
                // remove={remove}
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
    <li className='newListButton'
      onClick={handleNewListButton}>
      (+)
    </li>
  )
}

const ListOption = ({listName, handleListChange, style}) => {
  return (
    <li className='listOption'
      style={style}
      onClick={handleListChange}>
        {listName}
      </li>
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
    displayedTodos.push(<li id="acu" key="acu"><span className="wiredLink">all caught up!</span></li>)

    felixImage = <img className="felixTheCat" src={felixTheCat} alt="felix the cat" />
  }

  return (
    <div id="listWrapper">
      <ul className="allTodosUl">
        {felixImage}
        {displayedTodos}
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

// Render the general Container to the DOM
ReactDOM.render(<App />, document.getElementById('root'));
