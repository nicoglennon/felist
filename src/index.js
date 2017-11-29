import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Component Structure
// --------------------
// Container
// --> Title
// --> Form
// --> List
// ----> Todo
// --> Footer

class Container extends React.Component {
  constructor(props) {
    super(props);

    const introData = [
      {
        id: -3,
        value: "Hey dude!",
      },
      {
        id: -2,
        value: "What is up!"
      },
      {
        id: -1,
        value: "You crazy for this one, Ye."
      },
    ]

    this.state = {
      data: introData,
    }
  }

  render() {
		return (
			<div id="container">
				<Title />
				{/* <Form addTodo={this.addTodo} /> */}
				<List todos={this.state.data} />
				{/* <Footer /> */}
			</div>
		);
	}
}

const Title = () => {
	return (
		<div id="titleWrapper">
			<h1 className="titleHeader">Nico's Ultimate To-do List</h1>
		</div>
	);
};


// List Component
const List = ({todos}) => {
  let allTodos = [];

  if(todos.length > 1) {
    allTodos = todos.map(todo => {
      return (<Todo todo={todo} />)
    })
  } else {
    allTodos.push(<li id="acu"> All caught up!</li>)
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
const Todo = ({todo}) => {
  // single todo
  return (
    <li className="todos">
      {todo.value}
    </li>
  )
}

// Render the general Container to the DOM
ReactDOM.render(<Container />, document.getElementById('root'));
