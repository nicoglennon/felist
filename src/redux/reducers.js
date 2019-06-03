// initialize the app data
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
  }
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

function rootReducer(state = initialState, action) {
  return state;
};

export default rootReducer;