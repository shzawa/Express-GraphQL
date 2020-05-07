const {
  GraphQLString,
  GraphQLNonNull,
} = require('graphql')
const schema = require('../../')

const bcrypt = require('bcrypt')
const func = require('../func')

const User = require('../../models/user')
const UserType = require('../../types/user')

exports.User = {
  type: UserType,
  args: {
    name: {
      type: GraphQLNonNull(GraphQLString)
    },
    email: {
      type: GraphQLNonNull(GraphQLString)
    },
    password: {
      type: GraphQLNonNull(GraphQLString)
    },
  },
  resolve(_, args) {
    // バリデーションするならここ？

    const user = new User({
      hash_id: func.getUniqueStr(),
      name: args.name,
      email: args.email,
      password: bcrypt.hashSync(args.password, 10)
    })
    return user.save()
  }
}
