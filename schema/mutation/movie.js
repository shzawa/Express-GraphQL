const {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} = require('graphql')

const Movie = require('../models/movie')
const MovieType = require('../types/movie')

module.exports = {
  addMovie: {
    type: MovieType,
    args: {
      name: {
        type: GraphQLString
      },
      genre: {
        type: GraphQLString
      },
      directorId: {
        type: GraphQLID
      }
    },
    resolve(_, args) {
      const movie = new Movie({
        name: args.name,
        genre: args.genre,
        directorId: args.directorId
      })
      return movie.save()
    }
  },
  updateMovie: {
    type: MovieType,
    args: {
      id: {
        type: GraphQLNonNull(GraphQLID)
      },
      name: {
        type: GraphQLString
      },
      genre: {
        type: GraphQLString
      },
      directorId: {
        type: GraphQLID
      }
    },
    resolve(_, args) {
      let updateMovie = {}
      args.name && (updateMovie.name = args.name)
      args.genre && (updateMovie.genre = args.genre)
      args.directorId && (updateMovie.directorId = args.directorId)
      return Movie.findByIdAndUpdate(args.id, updateMovie, {
        new: true // 変更後の値をキャッチ
      })
    }
  },
  deleteMovie: {
    type: MovieType,
    args: {
      id: {
        type: GraphQLNonNull(GraphQLID)
      },
    },
    resolve(_, args) {
      return Movie.findByIdAndRemove(args.id)
    }
  },
}
