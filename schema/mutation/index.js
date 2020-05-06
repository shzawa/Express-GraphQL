const {
  GraphQLObjectType,
} = require('graphql')

const Movie = require('./movie')
const Director = require('./director')

// データ変更方法
module.exports = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...Movie,
    ...Director
  }
})
