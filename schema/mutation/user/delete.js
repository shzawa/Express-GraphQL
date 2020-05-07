const {
  GraphQLID,
  GraphQLNonNull,
} = require('graphql')
const schema = require('../../')

const User = require('../../models/user')
const UserType = require('../../types/user')

exports.User = {
  type: UserType,
  args: {
    id: {
      type: GraphQLNonNull(GraphQLID)
    },
  },
  resolve(_, args) {
    return User.findByIdAndRemove(args.id)
  }
}
