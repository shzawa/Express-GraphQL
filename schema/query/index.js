const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} = require('graphql')

const Movie = require('../models/movie')
const MovieType = require('../types/movie')

const Director = require('../models/director')
const DirectorType = require('../types/director')

// データ抽出方法
module.exports = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
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
    director: {
      type: DirectorType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(_, args) {
        return Director.findById(args.id)
      }
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(_, args) {
        return Movie.find({})
      }
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve(_, args) {
        return Director.find({})
      }
    }
  }
})
