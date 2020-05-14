const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean
} = require('graphql')

const User = require('../models/user')

module.exports = new GraphQLObjectType({
  name: 'Todo',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    title: {
      type: GraphQLString
    },
    isDone: {
      type: GraphQLBoolean
    },
    user: {
      type: new require('./user'),
      resolve(parent, args) {
        return User.findById(parent.userId)
      }
    }
  })
})
