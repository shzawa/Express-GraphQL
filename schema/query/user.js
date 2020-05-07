const {
  GraphQLID,
  GraphQLList,
} = require('graphql')

const User = require('../models/user')
const UserType = require('../types/user')

module.exports = {
  user: {
    type: UserType,
    args: {
      id: {
        type: GraphQLID
      }
    },
    resolve(_, args) {
      return User.findById(args.id)
    }
  },
  users: {
    type: new GraphQLList(UserType),
    resolve(_, args) {
      return User.find({})
    }
  }
}
