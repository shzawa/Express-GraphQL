const {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
} = require('graphql')

const Todo = require('../../models/todo')
const TodoType = require('../../types/todo')

exports.Todo = {
  type: TodoType,
  args: {
    id: {
      type: GraphQLNonNull(GraphQLID)
    },
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
    return Todo.findByIdAndUpdate(args.id, args, {
      new: true // 変更後の値をキャッチ
    })
  }
}
