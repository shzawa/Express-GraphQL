const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = graphql

const Movie = require('../models/movie')
const Director = require('../models/director')

exports = {
  MovieType: new GraphQLObjectType({
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
  }),
  DirectorType: new GraphQLObjectType({
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
}
