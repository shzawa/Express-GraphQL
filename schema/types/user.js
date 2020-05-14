const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
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
    todos: {
      type: new GraphQLList(new require('./todo')),
      resolve(parent, args) {
        return Todo.find({
          userId: parent.id
        })
      }
    }
  })
})
