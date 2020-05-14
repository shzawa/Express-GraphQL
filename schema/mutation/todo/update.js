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
      type: GraphQLString
    },
    isDone: {
      type: GraphQLBoolean
    },
    userId: {
      type: GraphQLID
    }
  },
  resolve(_, args) {
    return Todo.findByIdAndUpdate(args.id, args, {
      new: true // 変更後の値をキャッチ
    })
  }
}
