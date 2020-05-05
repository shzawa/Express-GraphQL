const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
} = graphql

const Director = require('../models/director')
const DirectorType = require('./director')

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
      type: DirectorType,
      resolve(parent, args) {
        return Director.findById(parent.directorId)
      }
    }
  })
})
