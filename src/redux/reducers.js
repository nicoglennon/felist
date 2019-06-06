// initialize the app data

// clear localstorage in development
// localStorage.clear();

const initialState = {
  value: '',
  currentListId: 'list-1',
  dragging: false,
  refactoredData: {
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
  },
}

const removeTodo = (state, action) => {
  const id = action.id;
  const {refactoredData, currentListId} = state;
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
  return Object.assign({}, state, {refactoredData: newData});
}

const changeTodo = (state, action) => {
  const todoId = action.todoId;
  const newValue = action.newValue;

  const { refactoredData } = state;
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
  return Object.assign({}, state, {refactoredData: newData});
}

const removeList = (state, action) => {
  const { refactoredData } = state;
  const listId = action.listId;
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
  return Object.assign({}, state, {refactoredData: newData, currentListId: newCurrentListId});
}

const editListName = (state, action) => {
  const {refactoredData} = state;
  const listId = action.listId;
  const newName = action.newName
  const newData = {
    ...refactoredData,
    lists: {
      ...refactoredData.lists,
      [listId]: {
        ...refactoredData.lists[listId],
        name: newName,
      }
    }
  }
  return Object.assign({}, state, {refactoredData: newData});  
}

const newList = (state, action) => {
  const { refactoredData } = state;
  const name = action.name;
  const newListId = action.id;
  console.log(newListId);
  let newListOrder = Array.from(refactoredData.listOrder);
  newListOrder.push(newListId);

  const newData = {
    ...refactoredData,
    lists: {
      ...refactoredData.lists,
      [newListId]: {
        id: newListId,
        name: name,
        todoIds: [],
      }
    },
    listOrder: newListOrder,
  }
  return Object.assign({}, state, {refactoredData: newData, currentListId: newListId}); 
}

const submitTodo = (state, action) => {
  const {refactoredData, currentListId } = state;

  const newTodo = {
    id: action.id,
    value: action.value,
  }

  let updatedTodoIds = Array.from(refactoredData.lists[currentListId].todoIds);
  updatedTodoIds.push(action.id);

  const newData = {
    ...refactoredData,
    todos: {
      ...refactoredData.todos,
      [action.id]: newTodo,
    },
    lists: {
      ...refactoredData.lists,
      [currentListId]: {
        ...refactoredData.lists[currentListId],
        todoIds: updatedTodoIds,
      }
    }
  }
  return Object.assign({}, state, {refactoredData: newData, value: ''});   
}

const moveTodo = (state, action) => {
  const { destination, source, draggableId } = action.dropResult;
  const list = state.refactoredData.lists[source.droppableId];
  const newTodoIds = Array.from(list.todoIds);
  newTodoIds.splice(source.index, 1);
  newTodoIds.splice(destination.index, 0, draggableId);

  const newList = {
    ...list,
    todoIds: newTodoIds,
  }

  const newData = {
    ...state.refactoredData,
    lists: {
      ...state.refactoredData.lists,
    [newList.id]: newList,
    },
  }
  return Object.assign({}, state, {refactoredData: newData, dragging: false});   
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_NEW_TODO_FORM':
      return Object.assign({}, state, {value: action.value});
    case 'CHANGE_LIST':
      return Object.assign({}, state, {currentListId: action.listId, value: ''});
    case 'START_DRAG':
      return Object.assign({}, state, {dragging: true});
    case 'END_DRAG':
      return Object.assign({}, state, {dragging: false});
    case 'REMOVE_TODO':
      return removeTodo(state, action);
    case 'CHANGE_TODO':
      return changeTodo(state, action);
    case 'REMOVE_LIST':
      return removeList(state, action);
    case 'EDIT_LIST_NAME':
      return editListName(state, action);
    case 'NEW_LIST':
      return newList(state, action);
    case 'SUBMIT_TODO':
      return submitTodo(state, action);
    case 'MOVE_TODO':
      return moveTodo(state, action);
    default:
      return state;
    }
};

export default rootReducer;