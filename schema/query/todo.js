const {
  GraphQLID,
  GraphQLList,
} = require('graphql')

const Todo = require('../models/todo')
const TodoType = require('../types/todo')

module.exports = {
  todo: {
    type: TodoType,
    args: {
      id: {
        type: GraphQLID
      }
    },
    resolve(_, args) {
      return Todo.findById(args.id)
    }
  },
  todos: {
    type: new GraphQLList(TodoType),
    resolve(_, args) {
      return Todo.find({})
    }
  }
}
