const {
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql')
const bcrypt = require('bcrypt')

const User = require('../models/user')
const UserType = require('../types/user')


// hash_id生成
function getUniqueStr(strong = 10000000) {
  return new Date().getTime().toString(16) + Math.floor(strong * Math.random()).toString(16)
}

module.exports = {
  addUser: {
    type: UserType,
    args: {
      name: {
        type: GraphQLString
      },
      email: {
        type: GraphQLString
      },
      password: {
        type: GraphQLString
      },
    },
    resolve(_, args) {
      // バリデーションするならここ？

      const user = new User({
        hash_id: getUniqueStr(),
        name: args.name,
        email: args.email,
        password: bcrypt.hashSync(args.password, 10)
      })
      return user.save()
    }
  },
  updateUser: {
    type: UserType,
    args: {
      id: {
        type: GraphQLNonNull(GraphQLID)
      },
      hash_id: {
        type: GraphQLString
      },
      name: {
        type: GraphQLString
      },
      email: {
        type: GraphQLString
      },
      password: {
        type: GraphQLString
      },
    },
    resolve(_, args) {
      const updateUser = {
        hash_id: args.hash_id,
        name: args.name,
        email: args.email,
        password: args.password
      }
      return User.findByIdAndUpdate(args.id, updateUser, {
        new: true // 変更後の値をキャッチ
      })
    }
  },
  deleteUser: {
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
}
