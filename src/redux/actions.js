import shortid from "shortid"

const actions = {
    deleteTodo: function(id) {
      return {
        type: 'DELETE_TODO',
        id,
       }
    },
    changeNewTodoForm: function(value) {
        return {
            type: 'CHANGE_NEW_TODO_FORM',
            value,
        }
    },
    changeList: function(listId) {
        return {
            type: 'CHANGE_LIST',
            listId,
        }
    },
    startDrag: function() {
        return {
            type: 'START_DRAG',
        }
    },
    endDrag: function() {
        return {
            type: 'END_DRAG',
        }
    },

    removeTodo: function(id) {
        return {
            type: 'REMOVE_TODO',
            id,
        }
    },
    changeTodo: function(todoId, newValue) {
        return {
            type: 'CHANGE_TODO',
            todoId,
            newValue,
        }
    },
    removeList: function(listId) {
        return {
            type: 'REMOVE_LIST',
            listId,
        }
    },
    editListName: function(listId, newName) {
        return {
            type: 'EDIT_LIST_NAME',
            listId,
            newName,
        }
    },
    newList: function(name) {
        return {
            type: 'NEW_LIST',
            name,
            id: shortid.generate(),
        }
    },
    submitTodo: function(value) {
        return {
            type: 'SUBMIT_TODO',
            value,
            id: shortid.generate(),
        }
    },
    moveTodo: function(dropResult) {
        return {
            type: 'MOVE_TODO',
            dropResult,
        }
    }
  }
  export default actions