const {
  GraphQLString,
  GraphQLList,
} = require('graphql')

const Movie = require('../models/movie')
const MovieType = require('../types/movie')

module.exports = {
  movie: {
    type: MovieType,
    args: ({
      id: {
        type: GraphQLString
      }
    }),
    resolve(_, args) {
      return Movie.findById(args.id)
    },
  },
  movies: {
    type: new GraphQLList(MovieType),
    resolve(_, args) {
      return Movie.find({})
    }
  }
}
