const {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
} = require('graphql')

const bcrypt = require('bcrypt')
const func = require('../func')

const User = require('../../models/user')
const UserType = require('../../types/user')

exports.UserName = {
  type: UserType,
  args: {
    id: {
      type: GraphQLNonNull(GraphQLID)
    },
    name: {
      type: GraphQLNonNull(GraphQLString)
    },
  },
  resolve(_, args) {
    // nameバリデーション
    // nameのダブり検知バリデーション

    const updateUser = {
      name: args.name,
    }
    return User.findByIdAndUpdate(args.id, updateUser, {
      new: true // 変更後の値をキャッチ
    })
  }
}

exports.User = {
  type: UserType,
  args: {
    id: {
      type: GraphQLNonNull(GraphQLID)
    },
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
    const updateUser = {
      hash_id: func.getUniqueStr(),
      name: args.name,
      email: args.email,
      password: bcrypt.hashSync(args.password, 10)
    }
    return User.findByIdAndUpdate(args.id, updateUser, {
      new: true // 変更後の値をキャッチ
    })
  }
}
