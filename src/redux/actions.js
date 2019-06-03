const actions = {
    addTodo: function(payload) {
      return {
        type: 'ADD_TODO',
        payload,
      }
    },
    deleteTodo: function(id) {
      return {
        type: 'DELETE_TODO',
        id,
       }
    }
  }
  export default actions