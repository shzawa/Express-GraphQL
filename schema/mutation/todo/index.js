const add = require('./add')
const update = require('./update')
const del = require('./delete')

module.exports = {
  // Add
  addTodo: add.Todo,

  // Update
  updateTodo: update.Todo,

  // Delete
  deleteTodo: del.Todo,
}
