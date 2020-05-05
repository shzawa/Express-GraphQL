const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = graphql

const Movie = require('../models/movie')

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
      type: new GraphQLList(new require('./movie')),
      resolve(parent, args) {
        return Movie.find({
          directorId: parent.id
        })
      }
    }
  })
})
