const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
} = require('graphql')

const Todo = require('../models/todo')

module.exports = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: GraphQLID
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
    hash_id: {
      type: GraphQLString
    },
    // director: {
    //   type: new require('./director'),
    //   resolve(parent, args) {
    //     return User.findById(parent.directorId)
    //   }
    // }
  })
})
