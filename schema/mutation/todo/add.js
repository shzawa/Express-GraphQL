const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLID
} = require('graphql')

const Todo = require('../../models/todo')
const TodoType = require('../../types/todo')

exports.Todo = {
  type: TodoType,
  args: {
    title: {
      type: GraphQLNonNull(GraphQLString)
    },
    isDone: {
      type: GraphQLNonNull(GraphQLBoolean)
    },
    userId: {
      type: GraphQLNonNull(GraphQLID)
    }
  },
  resolve(_, args) {
    const todo = new Todo(args)
    return todo.save()
  }
}
