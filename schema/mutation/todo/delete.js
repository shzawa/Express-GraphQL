const {
  GraphQLID,
  GraphQLNonNull,
} = require('graphql')

const Todo = require('../../models/todo')
const TodoType = require('../../types/todo')

exports.Todo = {
  type: TodoType,
  args: {
    id: {
      type: GraphQLNonNull(GraphQLID)
    },
  },
  resolve(_, args) {
    return Todo.findByIdAndRemove(args.id)
  }
}
