const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
} = graphql

const Director = require('../models/director')

module.exports = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    genre: {
      type: GraphQLString
    },
    director: {
      type: new require('./director'),
      resolve(parent, args) {
        return Director.findById(parent.directorId)
      }
    }
  })
})
