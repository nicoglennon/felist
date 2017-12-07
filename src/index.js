import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import styles from './styles/title.js';

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

    const introData = [
      {
        id: -3,
        value: "Welcome to simplist.",
      },
      {
        id: -2,
        value: "It is made completely in React."
      },
      {
        id: -1,
        value: "Type into the above box to add an item. Click the 'X' next to an item to delete it!"
      },
    ]

    this.state = {
      data: introData,
      value: '',
    };
    // bind the handler functions
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
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
    }

    this.setState(prevState => {
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
    console.log(id);
    const newList = this.state.data.filter(todo => {
      if (todo.id !== id) {
        return todo;
      }
    })
    this.setState({ data: newList });
  }

  render() {
		return (
			<div id="appContainer">
				<Title />
				<Form handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              text={this.state.value}
        />
				<List todos={this.state.data}
              remove={this.removeTodo}
        />
			</div>
		);
	}
}

const Title = () => {
	return (
		<div id="titleWrapper">
			<h1 className="titleHeader">Simplist</h1>
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
            placeholder="Add item..."
          />
          <button>
            Add
          </button>
        </form>
      </div>
    );
  };

}

// List Component
const List = ({todos, remove}) => {
  let allTodos = [];

  if(todos.length > 0) {
    allTodos = todos.map(todo => {
      return (<Todo todo={todo}
                    key={todo.id}
                    remove={remove}
              />)
    })
  } else {
    allTodos.push(<li id="acu" key="acu"> All caught up!</li>)
  }

  return (
    <div id="listWrapper">
      <ul className="allTodosUl">
        {allTodos}
      </ul>
    </div>
  )
}

// single Todo Component
const Todo = ({todo, remove}) => {
  // single todo
  return (
    <div className="listItemWrapper">
      <li className="todos">
        {todo.value}
      </li>
      <button
        className="removeBtn"
        onClick={()=> {
          remove(todo.id)
        }}>
        x
      </button>
    </div>
  )
}

// Render the general Container to the DOM
ReactDOM.render(<App />, document.getElementById('root'));
