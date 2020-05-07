const add = require('./add')
const update = require('./update')
const del = require('./delete')

module.exports = {
  // Add
  addUser: add.User,

  // Update
  updateUserName: update.UserName,
  updateUser: update.User,

  // Delete
  deleteUser: del.User,
}
