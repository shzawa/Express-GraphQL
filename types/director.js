const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = graphql

const Movie = require('../models/movie')

const MovieType = require('./movie')

module.exports = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return Movie.find({
          directorId: parent.id
        })
      }
    }
  })
})
