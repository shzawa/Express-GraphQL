const {
  GraphQLObjectType,
} = require('graphql')

const {
  addMovie,
  updateMovie,
  deleteMovie
} = require('./movie')

const {
  addDirector,
  updateDirector,
  deleteDirector
} = require('./director')


// データ変更方法
module.exports = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // movie
    addMovie,
    updateMovie,
    deleteMovie,

    // director
    addDirector,
    updateDirector,
    deleteDirector
  }
})
